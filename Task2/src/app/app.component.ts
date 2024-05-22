import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LDRP';
  imageUrl="C:/Users/rajan/OneDrive/Desktop/dknd.jpeg";

  isVisible=true;
items=["item1","item2","item3"]
  onClick(){
   alert("Button clicked");
  }
  
  myName='';

}

