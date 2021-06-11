import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { book } from '@buyonline/shared/data-access/models';
import { ApiService } from './api.service';
describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;
  const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
  const book = {
    id: 2,
    volumeInfo: {
      title: 'Angular',
    },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  it('Should create', () => {
    expect(service).toBeTruthy();
  });

  it('Should call api request', () => {
    let result: book[] = [];
    service.apiRequest('GET', {}, {}).subscribe((data) => {
      result = data;
    });
    const req = httpTestingController.expectOne({
      method: 'GET',
      url: baseUrl,
    });

    req.flush([book]);
    expect(result[0]).toEqual(book);
  });
  it('Should call api request if id is given', () => {
    let result: book[] = [];
    service.apiRequest('GET', { id: '1' }, {}).subscribe((data) => {
      result = data;
    });
    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${baseUrl}/1`,
    });

    req.flush([book]);
    expect(result[0]).toEqual(book);
  });
  it('Should call api request if the query params are given', () => {
    let result: book[] = [];
    service.apiRequest('GET', {}, { q: 'ang' }).subscribe((data) => {
      result = data;
    });
    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${baseUrl}?q=ang`,
    });
    req.flush([book]);
    expect(result[0]).toEqual(book);
  });

  it('Should display error', () => {
    let errorObj = {
      status: '',
      error: '',
    };
    service.apiRequest('GET', {}, {}).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        errorObj = err;
      }
    );
    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${baseUrl}`,
    });

    req.flush('Failed', { status: 404, statusText: 'Not Found' });
    expect(errorObj?.status).toEqual(404);
    expect(errorObj?.error).toEqual('Failed');
  });
});
