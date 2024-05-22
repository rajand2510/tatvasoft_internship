import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display success message on valid credentials', () => {
    component.username = 'student1@example.com';
    component.password = 'password1';
    component.onSubmit();

    fixture.detectChanges();

    const alertElement = fixture.debugElement.query(By.css('.alert-success'));
    expect(alertElement).toBeTruthy();
    expect(alertElement.nativeElement.textContent).toContain('Successfully registered');
  });

  it('should display error message on invalid credentials', () => {
    component.username = 'invalid@example.com';
    component.password = 'invalidpassword';
    component.onSubmit();

    fixture.detectChanges();

    const alertElement = fixture.debugElement.query(By.css('.alert-danger'));
    expect(alertElement).toBeTruthy();
    expect(alertElement.nativeElement.textContent).toContain('Invalid credentials');
  });
});
