import 'dart:async';
import 'package:flutter/foundation.dart';
// import 'package:siprix_voip_sdk/siprix_voip_sdk.dart'; // Will use if SDK exposes exact method

class AudioService extends ChangeNotifier {
  // Placeholder for the SDK instance or reference to SipService
  // final SiprixVoipSdk _siprix;

  bool _isPlaying = false;
  bool get isPlaying => _isPlaying;

  Future<void> playAiResponse(int callId, String audioFilePath) async {
    print("AudioService: Playing $audioFilePath into call $callId");
    _isPlaying = true;
    notifyListeners();

    try {
      // SDK Method usage (Hypothetical based on research):
      // await _siprix.player.playFile(callId, audioFilePath);

      // Simulating playback duration
      await Future.delayed(const Duration(seconds: 3));

      print("AudioService: Playback finished");
    } catch (e) {
      print("AudioService: Error playing audio: $e");
    } finally {
      _isPlaying = false;
      notifyListeners();
    }
  }

  Future<void> stopPlayback(int callId) async {
    // await _siprix.player.stop(callId);
    _isPlaying = false;
    notifyListeners();
  }
}
