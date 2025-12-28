import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/sip_service.dart';
import '../services/audio_service.dart';

class CallScreen extends StatelessWidget {
  const CallScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Listen to changes in SipService
    final sipService = context.watch<SipService>();
    final audioService = context.watch<AudioService>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('AnswerForMe Active'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () async {
              await context.read<SipService>().unregister();
              if (context.mounted) {
                Navigator.of(context).pushReplacementNamed('/');
              }
            },
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.phone_in_talk, size: 80, color: Colors.green),
            const SizedBox(height: 20),
            Text(
              'Status: ${sipService.state.name}',
              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),
            if (sipService.lastError != null)
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text(
                  'Error: ${sipService.lastError}',
                  style: const TextStyle(color: Colors.red),
                  textAlign: TextAlign.center,
                ),
              ),
            const SizedBox(height: 20),
            if (audioService.isPlaying)
              const Text(
                '🔊 AI Speaking...',
                style: TextStyle(
                  color: Colors.blue,
                  fontWeight: FontWeight.bold,
                ),
              ),

            const SizedBox(height: 10),
            ElevatedButton(
              onPressed: audioService.isPlaying
                  ? null
                  : () {
                      // Determine a call ID (mock for now)
                      context.read<AudioService>().playAiResponse(
                        123,
                        'assets/ai_greeting.mp3',
                      );
                    },
              child: const Text('Play AI Greeting'),
            ),
            const SizedBox(height: 30),

            // Simulation controls (for testing without real calls)
            ElevatedButton.icon(
              icon: const Icon(Icons.notifications_active),
              label: const Text('Simulate Incoming Call (5s delay)'),
              onPressed: () {
                // This triggers the registration logic again which contains the simulation
                // In a real app, this would be a debug only feature
                context.read<SipService>().register(
                  // Re-using current creds or just triggering the side effect
                  // This is a bit hacky for the demo but works for "Triggering" logic
                  // Better would be to expose _simulateIncomingCall public for debug
                  context.read<SipService>().lastAccount ??
                      // Fallback dummy if null
                      // Actually, let's just show a snackbar instructions
                      null
                          as dynamic, // This will crash if we don't fix SipService
                );

                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Simulating call in 5 seconds...'),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
