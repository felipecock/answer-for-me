import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'services/sip_service.dart';
import 'services/audio_service.dart';
import 'screens/login_screen.dart';

void main() {
  runApp(const AnswerForMeApp());
}

class AnswerForMeApp extends StatelessWidget {
  const AnswerForMeApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => SipService()),
        ChangeNotifierProvider(create: (_) => AudioService()),
      ],
      child: MaterialApp(
        title: 'Answer For Me',
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
          useMaterial3: true,
        ),
        home: const LoginScreen(),
      ),
    );
  }
}
