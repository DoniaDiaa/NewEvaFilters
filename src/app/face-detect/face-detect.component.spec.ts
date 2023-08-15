import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FaceDetectComponent } from './face-detect.component';


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        FaceDetectComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(FaceDetectComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'face-app'`, () => {
    const fixture = TestBed.createComponent(FaceDetectComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('face-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(FaceDetectComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('face-app app is running!');
  });
});
