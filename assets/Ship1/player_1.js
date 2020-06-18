function player1(){ // Tàu 1

  this.posX = random(30, windowWidth-30);   // Tọa độ x ban đầu
  this.posY = random(30, windowHeight-30);  // Tọa độ y ban đầu

  this.rotation = 0;                        // Góc theo DEGREE
  let angle = TWO_PI*this.rotation/360.0;   // Góc theo RADIAN
  this.persec = [sin(angle), -cos(angle)];  // Hướng đi ban đầu của tàu

  this.state = 0;                           // Trạng thái của tàu
  this.time_out_of_ship = 0;                // Thời điểm phá nát rời khỏi tàu

  this.normal_ammo = 3;                     // Đạn bình thường ban đầu
  this.special_ammo = 3;                    // Đạn đặc biệt ban đầu
  this.reload = 0;                          // Đếm thời gian để nạp 1 viên đạn bình thường
  this.type_special_ammo = "laser"               // Loại đạn ban đầu

  this.order = 0;                           // Vị trí trong mảng

  this.knockback = 0;                       // Bị lùi lại do đạn laze

  this.update = function(){ // Cập nhật trạng thái tàu

    if(keyIsPressed){
      if(keyIsDown(81)){ // Nút q
        if(!reverse_state){
          this.rotation = ((this.rotation+3>360) ? this.rotation+3-360 : this.rotation+3);  //
          let angle = TWO_PI*this.rotation/360.0;                                           // Cập nhật hướng tàu sẽ đi nếu không đổi chiều
          this.persec = [sin(angle), -cos(angle)];                                          //
        }
        else{
          this.rotation = ((this.rotation-3<0) ? this.rotation-3+360 : this.rotation-3);    //
          let angle = TWO_PI*this.rotation/360.0;                                           // Cập nhật hướng tàu sẽ đi nếu đổi chiều
          this.persec = [sin(angle), -cos(angle)];                                          //
        }
      }
      if(keyIsDown(87)&&this.state==2){ // Nút w
        this.posX = Math.min(Math.max(this.posX+this.persec[0]*1.5, 30), windowWidth-30);   // Cập nhật trạng thái đi nếu tàu bị phá
        this.posY = Math.min(Math.max(this.posY+this.persec[1]*1.5, 30), windowHeight-30);  //
      }
    }

    if(this.state<=1&&!this.knockback){
      this.posX = Math.min(Math.max(this.posX+this.persec[0]*1.5, 30), windowWidth-30);   // 
      this.posY = Math.min(Math.max(this.posY+this.persec[1]*1.5, 30), windowHeight-30);  //
    }                                                                                     //
    else if(this.knockback){                                                              // Cập nhật vị trí mới của tàu 
      this.posX = Math.min(Math.max(this.posX-this.persec[0]*1.5, 30), windowWidth-30);   //
      this.posY = Math.min(Math.max(this.posY-this.persec[1]*1.5, 30), windowHeight-30);  //
      this.knockback--;                                                                   //
    }

    if(this.normal_ammo<3)  //
      this.reload++;        //
    if(this.reload==90){    // Nạp đạn
      this.normal_ammo++;   //
      this.reload = 0;      //
    }

    if(this.state==2){                                          // Hồi phục tàu bị phá nếu sống đủ lâu
      this.time_out_of_ship++;
      if(this.time_out_of_ship==360){
        this.state = 1;
        this.time_out_of_ship = 0;
      }
    }
  }

  this.display_ship = function(){ // Vẽ tàu
    push()
    translate(this.posX, this.posY);
    rotate(TWO_PI*this.rotation/360.0);
    imageMode(CENTER);
    image(ship1[this.state], 0, 0);
    pop()
  }

  this.display_ammo = function(time_passed){  // Vẽ đạn bay quanh tàu
    if(this.state<=1){
      push()
      fill(255);
      translate(this.posX, this.posY);
      rotate(time_passed);
      for(let i=0;i<=this.normal_ammo-1;i++){
        rotate(TWO_PI/3.0);
        square(25, -2.5, 5);
      }
      pop()
    }
  }
}