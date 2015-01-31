var timer_offset, jump_the_gun, open_time, join_btn, screeningTimer;

var readyStateCheckInterval = setInterval(function() {

	if (document.readyState === "complete") {

		clearInterval(readyStateCheckInterval);

		initialize();

	}

}, 10);

var initialize = function() {

	jump_the_gun = 400;
	open_time    = document.querySelector('.wl-state-early > .livetime').dataset.epoch / 1000;
	join_btn     = document.querySelector('#join-ui > a');

	chrome.runtime.sendMessage({}, function(response) {

		timer_offset = response.toff;

	});

	injectCheckbox();

};

var injectCheckbox = function() {

	var container = document.createElement("label");

	container.className = "ui-btn";

	container.innerHTML = '<span class="ui-btn-inner"><input type="checkbox" id="auto-join"></input>Auto join the waitlist.</span>';

	container.querySelector('#auto-join').addEventListener('change', setupAutoWaitlist, true);

	var attach_to = document.querySelector('.wl-state-early');

	attach_to.appendChild(container);

};

var setupAutoWaitlist = function(event) {

	if ( event.target.checked ) {

		attachCountdownWatcher();

	} else {

		removeCountdownWatcher();

	}

};

var attachCountdownWatcher = function() {

	screeningTimer = setInterval(function() {

		var now = Math.ceil((new Date).getTime() / 1000) + timer_offset - jump_the_gun;

		if ( now > open_time ) {

			join_btn.click();

		}

	}, 200);

};

var removeCountdownWatcher = function() {

	clearInterval(screeningTimer);

};
