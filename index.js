class Timer{
    constructor(durationInput, startButton, pauseButton, callbacks){
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;

        //Callbacks for different events for future use
        if(callbacks){
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }

    //Starts the timer by invoking the tick function
    start = () => {

        //checks for callbacks and then sends out the callback signalling that the timer has started
        if(this.onStart){
            this.onStart();
        }

        //Invokes this.tick() one time before calling it in intervals so that it doesn't start delayed by 1 second
        this.tick();
        this.interval = setInterval(this.tick, 10);
    }

    //Pauses the timer by clearing ther interval that was invoked in the start function
    pause = () => {
        clearInterval(this.interval);
    }

    //Controls the ticking event i.e. changing the timer display each second
    tick = () => {
        if(this.remainingTime <= 0){
            this.pause();
            // Invokes the onComplete callback on completion of the timer ie when it reaches 0
            if(this.onComplete){
                this.onComplete();
            }
        }else{
            // Changes the display time through the getter and setter functions
            let time = this.remainingTime - 0.01;
            this.remainingTime = time.toFixed(2);

            // Invokes the onTick callback for each tick event
            if(this.onTick){
                this.onTick()
            }
        }
    }

    //gets the durationInput value from the html input tag
    get remainingTime(){
        return parseFloat(this.durationInput.value);
    }

    // Sets the durationInput value for the html input tag
    set remainingTime( time ){
        this.durationInput.value = time;
    }
}


// Runs the program by creating a Timer object
const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

const newTimer = new Timer(durationInput, startButton, pauseButton,
    {
        onStart : () => {
            console.log("The timer has started");
        },

        onTick : () => {
            console.log("The timer is ticking.");
        },

        onComplete : () => {
            console.log("The timer has finished.");
        }
    }
    );

