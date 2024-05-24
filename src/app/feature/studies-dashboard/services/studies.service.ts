import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Injectable,
  OnDestroy,
  Signal,
  TransferState,
  WritableSignal,
  computed,
  signal
} from '@angular/core';
import { Subject, Subscription, interval, map, takeUntil, tap } from 'rxjs';

import { ApiService, ErrorHandlerService } from '@core-module/services';
import { MappedStudy } from '@study-feature/models';
import { StudiesAdapterService } from '@study-feature/services/studies-adapter.service';

import { environment } from '../../../../environments/environment';
import { DefaultRequestFields, studyStateKeyConstant } from '../constants';
import { StudiesRequest, StudiesRequestParams } from '../types';

@Injectable()
export class StudiesService extends ApiService<MappedStudy[]> implements OnDestroy {
  protected _data: WritableSignal<MappedStudy[]> = signal([]);
  public data: Signal<MappedStudy[]> = computed(this._data);

  private defaultHttpParams: HttpParams = new HttpParams().set(
    'fields',
    DefaultRequestFields.join(',')
  );
  private nextPageToken = '';

  private destroy: Subject<void> = new Subject();

  constructor(
    protected override errorHandlerService: ErrorHandlerService,
    protected override http: HttpClient,
    private transferState: TransferState,
    private adapterService: StudiesAdapterService
  ) {
    super(`${environment.ANGULAR_BASE_API_URL}/studies`, http, errorHandlerService);
    this.getStudies();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  getStudies(params?: StudiesRequestParams): Subscription {
    return this.get<StudiesRequest>(this.buildHttpParams(params))
      .pipe(
        takeUntil(this.destroy),
        tap((data) => {
          this.nextPageToken = data.nextPageToken;
          return data;
        }),
        map((data) => {
          this._data.update((previousStudies) => {
            const [, ...restStudies] = previousStudies;
            restStudies.push(...this.adapterService.adapt(data.studies));
            return restStudies;
          });
          this.transferState.set(studyStateKeyConstant, this._data());
        })
      )
      .subscribe();
  }

  updateStudies(
    params: StudiesRequestParams = { pageSize: 1 },
    timer: number = 5000
  ): void {
    interval(timer)
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        this.getStudies(params);
      });
  }

  private buildHttpParams(params?: StudiesRequestParams): HttpParams {
    let httpParams = this.defaultHttpParams;
    if (this.nextPageToken) {
      httpParams = httpParams.append('pageToken', this.nextPageToken);
    }
    if (params?.pageSize) {
      httpParams = httpParams.append('pageSize', params.pageSize);
    }
    return httpParams;
  }
}
