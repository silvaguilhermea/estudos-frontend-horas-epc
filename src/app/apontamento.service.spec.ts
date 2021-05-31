import { TestBed } from '@angular/core/testing';

import { ApontamentosService } from './apontamentos.service';

describe('ApontamentoService', () => {
  let service: ApontamentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApontamentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
