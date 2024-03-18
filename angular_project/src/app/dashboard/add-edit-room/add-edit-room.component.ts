import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {RoomService} from "../../services/room.service";
import {NgIf} from "@angular/common";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-add-edit-room',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgIf,
    MatOptionModule,
    MatSelectModule
  ],
  templateUrl: './add-edit-room.component.html',
  styleUrl: './add-edit-room.component.css'
})
export class AddEditRoomComponent implements OnChanges {
  @Input("room") room: any;

  id: string = "";
  name = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required]);
  image1 = new FormControl('', [Validators.required]);
  image2 = new FormControl('', [Validators.required]);
  image3 = new FormControl('', [Validators.required]);
  image4 = new FormControl('', [Validators.required]);
  roomType = new FormControl('', [Validators.required]);

  constructor(private roomService: RoomService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.room);
    if (this.room != null) {
      this.id = this.room.id;
      this.name = new FormControl(this.room.name, [Validators.required]);
      this.description = new FormControl(this.room.description, [Validators.required]);
      this.price = new FormControl(this.room.price, [Validators.required]);
      this.image1 = new FormControl(this.room.image1, [Validators.required]);
      this.image2 = new FormControl(this.room.image2, [Validators.required]);
      this.image3 = new FormControl(this.room.image3, [Validators.required]);
      this.image4 = new FormControl(this.room.image4, [Validators.required]);
      this.roomType = new FormControl(this.room.roomType, [Validators.required]);
    }
  }

  getErrorMessage(input: FormControl): string {
    if (input.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  onSave(): void {
    let roomData = {
      id: this.id,
      name: this.name.getRawValue()!,
      description: this.description.getRawValue()!,
      price: this.price.getRawValue()!,
      image1: this.image1.getRawValue()!,
      image2: this.image2.getRawValue()!,
      image3: this.image3.getRawValue()!,
      image4: this.image4.getRawValue()!,
      roomType: this.roomType.getRawValue()!,
    };
    console.log();
    if (roomData.id == "") {
      this.roomService.createRoom(roomData);
    } else {
      this.roomService.updateRoom(roomData);
    }
    this.resetForm();
  }

  resetForm() {
    this.room = null;
    this.id = "";
    this.name = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [Validators.required]);
    this.price = new FormControl('', [Validators.required]);
    this.image1 = new FormControl('', [Validators.required]);
    this.image2 = new FormControl('', [Validators.required]);
    this.image3 = new FormControl('', [Validators.required]);
    this.image4 = new FormControl('', [Validators.required]);
    this.roomType = new FormControl('', [Validators.required]);
  }
}
