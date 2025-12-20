import 'package:flutter/material.dart';

class CallScreen extends StatelessWidget {
  const CallScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AnswerForMe Active'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              // TODO: Implement logout/unregister
              Navigator.of(context).pushReplacementNamed('/');
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
            const Text(
              'Call Screening Active',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),
            const Text('Waiting for incoming calls...'),
            const SizedBox(height: 30),
            // Placeholder for call simulation
            ElevatedButton(
              onPressed: () {
                // Simulate incoming call
              },
              child: const Text('Simulate Incoming Call'),
            ),
          ],
        ),
      ),
    );
  }
}
