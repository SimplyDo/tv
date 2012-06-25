'use strict';

/* Controllers */


function ChannelCtrl($scope,$location,youTube,Storage) {

  $scope.storageSupport = Storage.supported();

  if ($scope.storageSupport) {

    $scope.channels = Storage.loadObject('channels');  

  }

  $scope.initChannels = function() {

    $scope.channels = {
      'TheVerge':'The Verge',
      'TEDtalksDirector':'Ted Talks',
      'twit':'TWiT',
      'nasatelevision':'NASA',
      'revision3':'Revision3',
      'geekandsundry':'Geek & Sundray',
      'totallyradshow':'The Totally Rad Show',
      'apple':'Apple',
      'google':'Google',

    };

  }

  if (!$scope.channels) {

    $scope.initChannels();

  }

  if (!$scope.currentChannel) {

    $scope.showSwitcher = true;

  }


  $scope.resetDefaultChannels = function() {

    Storage.clear();
    $scope.initChannels();
    $scope.videoDetails = false;

  }


  $scope.addChannel = function() {

    if ($scope.newChannel.name && $scope.newChannel.displayName) {

      $scope.channels[$scope.newChannel.name] = $scope.newChannel.displayName;

      Storage.saveObject($scope.channels,'channels');

      //switch to new channel
      $scope.selectChannel($scope.newChannel.name);

      //clear form
      $scope.newChannel.name = '';

      $scope.newChannel.displayName = '';

    } else {

      alert('all fields are required');

    }

  }

  $scope.play = function() {
      
    player.playVideo();

  }

  $scope.whatIsOn = function() {
    
    if (!$scope.videoDetails) { 
      var playlist = player.getPlaylist();
      var index = player.getPlaylistIndex();
      var currentVideoId = playlist[index];
      $scope.videoDetails = youTube.videoById({item:currentVideoId});
    } else {
      $scope.videoDetails = false;
    }

  }

  $scope.toggleSwitcher = function() {
    
    if (!$scope.showSwitcher) { 
      $scope.showSwitcher = true;
    } else {
      $scope.showSwitcher = false;
    }

  }

  $scope.stop = function() {
      
    player.pauseVideo();

  }

  $scope.next = function() {
      
    $scope.videoDetails = false;
    player.nextVideo();

  }

  $scope.previous = function() {
    
    $scope.videoDetails = false;
    player.previousVideo();

  }

  $scope.shuffle = function() {
    
    $scope.videoDetails = false;
    player.setShuffle({
      shufflePlaylist:true
    });
    $scope.next();
    $scope.shuffled = true;

  }

  $scope.unShuffle = function() {
    
    $scope.videoDetails = false;
    $scope.selectChannel($scope.currentChannel);

  }

  $scope.removeChannel = function(channel) {

    delete $scope.channels[channel];

    Storage.saveObject($scope.channels,'channels');

  }

  $scope.selectChannel = function(channel) {

    $scope.videoDetails = false;
    $location.path('/channel/'+channel);
    $scope.currentChannel  = channel;

    player.loadPlaylist({
      listType:'user_uploads',
      list:channel
    });

    player.setLoop({loopPlaylists:true})

    $scope.showSwitcher = false;
    $scope.shuffled = false;

  }

}
