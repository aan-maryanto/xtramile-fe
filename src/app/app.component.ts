import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface AustralianAddress {
  address: string;
  suburb: string;
  state: string;
  postcode: string;
}

interface Patient {
  pid: string;
  first_name: string;
  last_name: string;
  dob: string;
  gender: string;
  phone_no: string;
  australian_address: AustralianAddress;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'xtramile-fe';
  items: Patient[] = [];
  options: String[] = ["MAN", "WOMAN"]
  patient  =   
  { 
    pid:"", 
    first_name: "", 
    last_name: "", 
    dob: "", 
    gender: "", 
    phone_no: "", 
    australian_address: {
      address: "", 
      suburb: "", 
      state: "", 
      postcode: ""
    }
  };
  currentItem: Patient = this.patient

  editMode = false;

  constructor(
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    // Fetch table data from an API or initialize with some data
    this.http.get('http://localhost:8080/xtramile/patient/list').subscribe((response:any)=> {
      console.info("Response : ", response)
      this.items  = response.data.list
      console.log(this.items)
    })
  }


  saveItem() {
    if (this.editMode) {
      this.updateItem();
    } else {
      this.addItem()
    }

    this.cancelEdit();
  }

  addItem() {
    this.http.post('http://localhost:8080/xtramile/patient/add', this.currentItem).subscribe((response: any) => {
      console.log(response)
      if(response.status == "200") {
        window.alert(response.message)
        window.location.reload()
      }
    })
  }

  updateItem() {
    this.http.post('http://localhost:8080/xtramile/patient/update', this.currentItem).subscribe((response : any) => {
      console.log(response)
      if(response.status == "200") {
        window.alert(response.message)
        window.location.reload()
      }
    })
  }

  editItem(item: Patient) {
    this.currentItem = { ...item };
    this.editMode = true;
  }

  deleteItem(item: Patient) {
    // const index = this.items.findIndex(i => i.id === item.id);
    // if (index !== -1) {
    //   this.items.splice(index, 1);
    // }
  }

  cancelEdit() {
    this.currentItem = this.patient;
    this.editMode = false;
  }

}
