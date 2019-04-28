
(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //
  const fetchSwimCommand = () => {
    $.ajax({
      type: 'GET',
      url: serverUrl,
      success: (res) => (SwimTeam.move(res)),
    });
  };

  const fetchRandomSwim = (command) => {
    $.ajax({
      type: 'GET',
      url: serverUrl,
      data: {
        command: command
      },
      success: (res) => (SwimTeam.move(res)),
    });
  };

  const fetchBackgroundImage = () => {
    $.ajax({
      type: 'GET',
      url: serverUrl + '/background.jpg',
      success: (res) => {
        console.log('success :(');
        window.location = window.location.href;
        // $('.background').css("background-image", `url(${res})`);
      },
      error: (error) => (console.log(error, 'failed :('))
    });
  };

  $("#getMove").on('click', (event) => {
    fetchSwimCommand();
  });

  $("#getRandom").on('click', (event) => {
    fetchRandomSwim('random');
  });

  $("#getBackground").on('click', (event) => {
    fetchBackgroundImage();
  });

  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUpload = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: (res) => {
        console.log(res);// reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUpload(file);
  });

})();
