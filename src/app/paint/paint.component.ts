import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.css']
})
export class PaintComponent implements OnInit {
  x = "black";
  y;
  hello: string;

  dot_flag: boolean;
  flag: boolean = false;
  currY: any;
  prevY: any;
  currX: any;
  prevX: any;
  cursor: string = 'crosshair';
  canvas;
  img;
  ctx;
  fat;

  w;
  h;

  green: string = 'green';
  constructor() {}

  ngOnInit() {
    this.canvas = document.getElementById('can');
    this.img = document.getElementById("canvasimg");
    this.ctx = this.canvas.getContext("2d");
    this.fat = document.getElementById("fat");
    this.y = this.fat.value;
    this.hello = this.y;

    this.w = this.canvas.width;
    this.h = this.canvas.height;

    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(0,0,this.w, this.h);

    
  }

  fatChange(){
    this.y = this.fat.value;
    this.hello = this.fat.value;
  }

  erase() {
    /*let m = confirm("Want to clear");
    if (m) {*/
        this.ctx.clearRect(0, 0, this.w, this.h);
    //} 
  }

  save() {
    let dataURL = this.canvas.toDataURL();
    this.img.src = dataURL;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.prevX, this.prevY);
    this.ctx.lineTo(this.currX, this.currY);
    this.ctx.strokeStyle = this.x;
    this.ctx.lineWidth = this.y;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawLinee(res, e) {

    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';

    if (res == 'down') {
      this.currX = this.getMousePos(e).x;
      this.currY = this.getMousePos(e).y;

      this.dot_flag = true;

      if (this.dot_flag) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.currX, this.currY);
        this.dot_flag = false;
        this.flag = true;
      }
    }

    if(res == 'move') {
      if (this.flag) {
        this.currX = this.getMousePos(e).x;
        this.currY = this.getMousePos(e).y;
        this.ctx.lineTo(this.currX, this.currY);
        this.ctx.strokeStyle = this.x;
        this.ctx.lineWidth = this.y;
        this.ctx.stroke();
      }
    }
	}

  color(obj) {
    switch (obj.target.id) {
        case "green":
            this.x = "green";
            break;
        case "blue":
            this.x = "blue";
            break;
        case "red":
            this.x = "red";
            break;
        case "yellow":
            this.x = "yellow";
            break;
        case "orange":
            this.x = "orange";
            break;
        case "black":
            this.x = "black";
            break;
        case "white":
            this.x = "white";
            break;
    }
  }

  getMousePos(evt) {
    let rect = this.canvas.getBoundingClientRect(), // abs. size of element
      scaleX = this.canvas.width / rect.width,    // relationship bitmap vs. element for X
      scaleY = this.canvas.height / rect.height;  // relationship bitmap vs. element for Y

    return {
      x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
      y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
  }

  findxy(res, e) {
    if (res == 'down') {
      this.prevX = this.currX;
      this.prevY = this.currY;
      this.currX = this.getMousePos(e).x;
      this.currY = this.getMousePos(e).y;
      /*this.currX = e.clientX - this.canvas.offsetLeft;
      this.currY = e.clientY - this.canvas.offsetTop;*/

      this.flag = true;
      this.dot_flag = true;
      if (this.dot_flag) {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.x;
        this.ctx.fillRect(this.currX, this.currY, 2, 2);
        this.ctx.closePath();
        this.dot_flag = false;
      }
    }
    if (res == 'up' || res == "out") {
        this.flag = false;
    }
    if (res == 'move') {
      if (this.flag) {
          this.prevX = this.currX;
          this.prevY = this.currY;
          this.currX = this.getMousePos(e).x;
          this.currY = this.getMousePos(e).y;
          this.draw();
      }
    }
  }

}
