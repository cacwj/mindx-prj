function scoreboard(){
  push()
  imageMode(CENTER);
  let col = color(0);
  col.setAlpha(180);
  fill(col);
  rect(0, 0, windowWidth, windowHeight);
  col.setAlpha(255);
  fill(33, 55, 156);
  if(moving/70>=aftermath_actions.length+0.5)
    start_new_round();
  if(moving/70<aftermath_actions.length+0.5&&moving/70>=aftermath_actions.length){
    for(let i=0;i<number_of_players;i++){
      push()
      rect(windowWidth/2-300, (windowHeight/2)-number_of_players*30+i*60, 600, 60);
      translate(windowWidth/2-280+player_score[i]*54, (windowHeight/2)-number_of_players*30+i*60+30);
      image(all_ships[i][0], 0, 0);
      pop()
    }
  }
  if(moving/70<aftermath_actions.length){
    let action = aftermath_actions[int(moving/70)];
    if(player_score[action[0]]+action[1]<0)
        action[1] = 0;
    for(let i=0;i<number_of_players;i++){
      rect(windowWidth/2-300, (windowHeight/2)-number_of_players*30+i*60, 600, 60);
      if(i!=action[0]){
        push()
        translate(windowWidth/2-280+player_score[i]*54, (windowHeight/2)-number_of_players*30+i*60+30);
        image(all_ships[i][0], 0, 0);
        pop()
      }
      else if(i==action[0]&&action[1]>0){
        push()
        translate(windowWidth/2-280+player_score[i]*54+(((moving%70>60)?60:moving%70)/60)*54, (windowHeight/2)-number_of_players*30+i*60+30);
        image(all_ships[i][0], 0, 0);
        pop()
      }
      else{
        push()
        translate(windowWidth/2-280+player_score[i]*54-(((moving%70>60)?60:moving%70)/60)*54, (windowHeight/2)-number_of_players*30+i*60+30);
        rotate(((moving%70>60)?60:moving%70)/5);
        image(all_ships[i][0], 0, 0);
        pop()
      }
    }
    if(moving%70==69)
      player_score[action[0]] += action[1];
  }
  moving++;
  pop();
}