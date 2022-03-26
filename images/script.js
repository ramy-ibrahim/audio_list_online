
myplayer = {
	audio: document.getElementById('audio_palyer'),
	playlist: playlist,
    sel_track:0,
	loop_check:null,
    main_dir:"http://ramy.pro/music/",
	
	play:function(){
		var play_but = document.getElementById('play');
		
		if(this.audio.paused == true){
			this.audio.play();
			play_but.innerHTML = "pause";
			play_but.title = "playing now";
            
            setTimeout(function(){
            
            myplayer.auto_next();
        
        
            },1000);
		
		}else{
            if (myplayer.loop_check != null) clearInterval(myplayer.loop_check);
            
			this.audio.pause();
			play_but.innerHTML = "play";
			play_but.title = "pausing now";
		}
		
        
        
        
	},
	
	
	
	stop:function(){
		if (myplayer.loop_check != null) clearInterval(myplayer.loop_check);
        this.audio.load();
        
        
	},
	
	set_time:function(dir,sec){
		
		if(dir == 'forward'){
		   this.audio.currentTime += sec;	
			
		}else{
			 this.audio.currentTime -= sec;
		}
		
	},
	
	
	load_list:function(){
		
		var get_select = document.getElementById("playlist");
	    var option;
		var list =this.playlist; 
		
		for(l=0;l<=(list.length -1);l++){
			option = document.createElement('option');
			option.innerHTML = list[l].title;
			option.value = list[l].file;
			
			get_select.appendChild(option);
		}
		
		
		
	},
	
	load_track:function(){
		
		var get_select = document.getElementById("playlist");
		 this.audio.src = this.main_dir+this.playlist[get_select.selectedIndex].file;
		 this.sel_track = get_select.selectedIndex;
        
		  document.getElementById('photo').src = this.main_dir+this.playlist[get_select.selectedIndex].poster;
		
		  document.getElementById('track_name').innerHTML = 'playing now: '+this.playlist[get_select.selectedIndex].title;
		  document.getElementById('vol').innerHTML = 'volume: '+Math.round(this.audio.volume*100)+'%' ;
        
        if (myplayer.loop_check != null) clearInterval(myplayer.loop_check);
        
		this.play();
		
        
		
	},
	
	set_volume:function(dir){
		
		if(dir == "up" && this.audio.volume < 1){
			this.audio.volume += 0.10;
			
		}else if(dir == "down" && this.audio.volume > 0){
			
			this.audio.volume -= 0.10;
			
				 
				 }
		 document.getElementById('vol').innerHTML = 'volume: '+Math.round(this.audio.volume*100)+'%' ;
	},
    
    
    auto_next: function(){
    
     var get_select = document.getElementById("playlist");
     var cur_track = this.sel_track ;
        
        
      myplayer.loop_check = setInterval(function(){
        //console.log('selected: '+get_select.selectedIndex +' - CurTrack" '+cur_track);
        myplayer.progress();  
          
        if(document.getElementById('audio_palyer').ended == true){
           
            if(cur_track+1 == this.playlist.length){
                
                clearInterval(myplayer.loop_check);
                myplayer.reset();
                
    
            }else{
                
                 clearInterval(myplayer.loop_check);
                get_select.selectedIndex  = cur_track+1;
                
                setTimeout(function(){
                    myplayer.load_track();
                    
                },1000);
                
                
                
               
                
                
            }
        }
            
        },500);
    },
	
    
    reset:function(){
        document.getElementById("playlist").selectedIndex = 0;
        this.sel_track = 0;
        this.audio.src = this.main_dir+this.playlist[0].file;
        document.getElementById('photo').src = this.main_dir+'images/simple.jpg';
        document.getElementById('track_name').innerHTML = "The land of nostalgia - Music Ramy Ibrahim";
        document.getElementById('play').innerHTML = "play";
        
    },
    
    progress: function(){

        
        document.getElementById('prog_in').style.width = (this.audio.currentTime / this.audio.duration) * 100+'%';
    }
    
    
	
}
// myplayer End




window.onload = function(){
	
	myplayer.load_list();
	myplayer.reset();
    
	document.getElementById("playlist").onchange = function(){
		myplayer.load_track();
	}
	
	document.getElementById('play').onclick = function(){
		
		myplayer.play();
		
	}
	
	
	document.getElementById('stop').onclick = function(){
		var play_but = document.getElementById('play');
		myplayer.stop();
		
		play_but.innerHTML = "play";
		play_but.title = "start play";
	}
	
	document.getElementById('forward').onclick = function(){
		
		myplayer.set_time('forward',10);
	}
	
	document.getElementById('backward').onclick = function(){
		
		myplayer.set_time('backward',10);
	}
	
	document.getElementById('vup').onclick = function(){
		myplayer.set_volume('up');
		
	}
	
	document.getElementById('vdown').onclick = function(){
		myplayer.set_volume('down');
		
	}
	
}