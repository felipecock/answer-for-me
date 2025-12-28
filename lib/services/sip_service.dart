import 'dart:async';
import 'package:flutter/foundation.dart';
// import 'package:siprix_voip_sdk/siprix_voip_sdk.dart';
import 'package:flutter_callkit_incoming/flutter_callkit_incoming.dart';
import 'package:flutter_callkit_incoming/entities/entities.dart';
import 'package:uuid/uuid.dart';
import '../models/sip_account.dart';

enum SipState {
  uninitialized,
  initializing,
  ready,
  registering,
  registered,
  registrationFailed,
}

class SipService extends ChangeNotifier {
  // final SiprixVoipSdk _siprix = SiprixVoipSdk();
  SipState _state = SipState.uninitialized;
  SipState get state => _state;

  String? _lastError;
  String? get lastError => _lastError;

  // int? _currentAccountId;

  // Maps CallId to internal ID
  // final Map<String, int> _activeCalls = {};

  Future<void> initialize() async {
    _state = SipState.initializing;
    notifyListeners();

    try {
      // Initialize logging and generic settings
      // API: await _siprix.initialize(...);
      // Assuming init is successful for now.

      // Listen to CallKit events
      FlutterCallkitIncoming.onEvent.listen((CallEvent? event) {
        if (event == null) return;
        _handleCallKitEvent(event);
      });

      _state = SipState.ready;
      notifyListeners();
      print("SipService initialized");
    } catch (e) {
      _lastError = e.toString();
      _state = SipState.uninitialized;
      notifyListeners();
      print("Error initializing SipService: $e");
    }
  }

  SipAccount? _lastAccount;
  SipAccount? get lastAccount => _lastAccount;

  Future<void> register(SipAccount account) async {
    _lastAccount = account;
    if (_state == SipState.uninitialized) {
      await initialize();
    }

    _state = SipState.registering;
    notifyListeners();

    try {
      // Real implementation would look like:
      // final accId = await _siprix.addAccount(Account(
      //   username: account.username,
      //   password: account.password,
      //   domain: account.domain,
      // ));
      // _currentAccountId = accId;

      _state = SipState.registered;
      notifyListeners();

      // Simulate incoming call for demo purposes after 5 seconds
      Future.delayed(const Duration(seconds: 5), () {
        _simulateIncomingCall();
      });
    } catch (e) {
      _lastError = e.toString();
      _state = SipState.registrationFailed;
      notifyListeners();
    }
  }

  Future<void> _simulateIncomingCall() async {
    final callId = const Uuid().v4();
    final params = CallKitParams(
      id: callId,
      nameCaller: 'Unknown Caller',
      appName: 'AnswerForMe',
      avatar: 'https://i.pravatar.cc/100',
      handle: '0123456789',
      type: 0, // 0 - Audio, 1 - Video
      textAccept: 'Accept',
      textDecline: 'Decline',
      missedCallNotification: const NotificationParams(
        showNotification: true,
        isShowCallback: true,
        subtitle: 'Missed call',
        callbackText: 'Call back',
      ),
      extra: <String, dynamic>{'userId': '1a2b3c4d'},
      headers: <String, dynamic>{'apiKey': 'Abc@123!', 'platform': 'flutter'},
      android: const AndroidParams(
        isCustomNotification: true,
        isShowLogo: false,
        ringtonePath: 'system_ringtone_default',
        backgroundColor: '#0955fa',
        backgroundUrl: 'https://i.pravatar.cc/500',
        actionColor: '#4CAF50',
      ),
      ios: const IOSParams(
        iconName: 'CallKitLogo',
        handleType: '',
        supportsVideo: true,
        maximumCallGroups: 2,
        maximumCallsPerCallGroup: 1,
        audioSessionMode: 'default',
        audioSessionActive: true,
        audioSessionPreferredSampleRate: 44100.0,
        audioSessionPreferredIOBufferDuration: 0.005,
        supportsDTMF: true,
        supportsHolding: true,
        supportsGrouping: false,
        supportsUngrouping: false,
        ringtonePath: 'system_ringtone_default',
      ),
    );
    await FlutterCallkitIncoming.showCallkitIncoming(params);
  }

  void _handleCallKitEvent(CallEvent event) {
    switch (event.event) {
      case Event.actionCallAccept:
        // TODO: Answer SIP call
        print('Call Accepted: ${event.body}');
        break;
      case Event.actionCallDecline:
        // TODO: Decline SIP call
        print('Call Declined: ${event.body}');
        break;
      default:
        break;
    }
  }

  Future<void> unregister() async {
    _state = SipState.ready;
    notifyListeners();
  }
}
