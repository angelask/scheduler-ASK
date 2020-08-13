// create variables
const today	  = moment().format("LLLL");
const busHrsStart = 6  // 9AM
const busHrsEnd   = 19 // 7PM
const stdBusHrs   = 24;
var state	  = localStorage;
var blocks	  = [];

// get stored timeblocks from local state
function getBlocks() {
	// check if timeblocks exist in local state
	if (state.timeBlocks != null) {
		// store json formatted time blocks
	        blocks = JSON.parse(state.timeBlocks);
			// loop time blocks and populate timeblocks table rows
			for (block in blocks) {
				hour = blocks[block].hour;
				value = blocks[block].value;
				$("#" + hour).val(blocks[block].value);
				// TBD
				$(`#lockIcon${hour}`).removeClass('fa-unlock');
				$(`#lockIcon${hour}`).addClass('fa-lock');
			}

		}
	}


// save timeblocks in local client storage
function saveBlock() {
	// find document lock icon element
       	$(this).find('i').toggleClass('fa-unlock fa-lock')
	// get document hour input field value
       	var input = $(`#hour${this.id}`);
       	var inputValue = input[0].value;

	// set timeblock storage format
       	var activity = {
		// format stored hour
       		hour: `hour${this.id}`,
		// set value
		value: inputValue
        }

	// if lock state is set
       	if($(this).find('i').hasClass('fa-lock')) {
		// store above activity in local state
		blocks.push(activity);
	        state.setItem('timeBlocks', JSON.stringify(blocks));
	}

	// if unlock state is set
	if( $(this).find('i').hasClass('fa-unlock') ) {
		// get and set timeblocks stored in local state
	        blocks = JSON.parse(state.timeBlocks);
		// loop stored timeblocks
       		for( let index = 0; index < blocks.length; index++) {
			// if current activity hour matches stored activity hour
       	  		if (activity.hour == blocks[i].hour) {
				var i = index;
				// remove activity hour from timeblocks array
				blocks.splice(i, 1);
				// save new list of timeblocks to local state
				state.setItem('timeBlocks', JSON.stringify(blocks));
				// loop timeblocks using element/index value
				for (let index = 0; index < blocks.length; index++) {
					// loop business hours
					for (var hr = 0; hr < stdBusHrs; hr++) {
						// if current hour matches stored timeblock hour
						if(blocks[index].hour == `hour${hr}`) {
							// set document value to value stored state
							$(`#hour${hr}`).val(blocks[index].value);
						}
					}
				}
			};
		};
	};
};

// dynamically update html document with timeblock rows
function renderBlocks(){
	// library used to format time
	busHrsFmt = moment
	// loop business hours
	for (var hr = busHrsStart; hr <= busHrsEnd; hr++) {
		// set time format
		busHr = busHrsFmt(hr, 'h').format("h A")
		// write timeblock to html document
		$(".container").append(
	          `<div class="row" >
	            <div class="col-1 hour ">${busHr}</div>
	            <input class="col-8 input" id="hour${hr}" type="text"></input>
	            <button class="col-1 editBlock" id="${hr}">
	              <i id="lockIconhour${hr}" class="fas fa-unlock"></i>
	            </button>
	           </div>`
		);
	}
}

// set timeblock color best on current time
function colorBlock() {
	// set hour format
	var hrFmt = moment().format("H");
	// loop business hours
	for (var hr = busHrsStart; hr <= busHrsEnd; hr++) {
		if (hr == hrFmt) {
			$(`#hour${hr}`).addClass("present");
		} else if (hr < hrFmt) {
			$(`#hour${hr}`).addClass("past");
        	} else {
			$(`#hour${hr}`).addClass("future");
		}
	};
}