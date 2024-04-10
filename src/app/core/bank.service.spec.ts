import { TestBed } from '@angular/core/testing';
import { BankService } from './bank.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FinancialProduct } from '../shared/models/financial-product';


describe('BankService', () => {
  let service: BankService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BankService]
    });
    service = TestBed.inject(BankService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Servicio de consulta de producto', () => {
    const mockData: FinancialProduct[] = [{
      id: 'prod-1',
      name: 'Producto 1',
      logo: 'https://www.educaciontrespuntocero.com/wp-content/uploads/2020/04/mejores-bancos-de-imagenes-gratis.jpg',
      description: 'Descripción product 1',
      date_release: new Date(),
      date_revision: new Date(),
    },
    {
      id: 'prod-2',
      name: 'Producto 2',
      logo: 'https://www.educaciontrespuntocero.com/wp-content/uploads/2020/04/mejores-bancos-de-imagenes-gratis.jpg',
      description: 'Descripción product 2',
      date_release: new Date(),
      date_revision: new Date(),
    }
    ];

    service.getFinancialServices().then(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne('baseUrl');
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);
  });

  it('Servicio de añadir producto', () => {
    const mockProduct: FinancialProduct = {
      id: 'prod-2',
      name: 'Producto 2',
      logo: 'https://www.educaciontrespuntocero.com/wp-content/uploads/2020/04/mejores-bancos-de-imagenes-gratis.jpg',
      description: 'Descripción product 2',
      date_release: new Date(),
      date_revision: new Date(),
    };

    service.addFinancialService(mockProduct).then(data => {
      expect(data).toEqual(mockProduct);
    });

    const req = httpTestingController.expectOne('baseUrl');
    expect(req.request.method).toEqual('POST');
    req.flush(mockProduct);
  });

});
