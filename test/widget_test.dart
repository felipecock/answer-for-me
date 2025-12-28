import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:answer_for_me/main.dart';

void main() {
  testWidgets('Login flow to CallScreen smoke test', (
    WidgetTester tester,
  ) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const AnswerForMeApp());
    await tester.pumpAndSettle();

    // Verify correct initial screen
    expect(find.text('SIP Login'), findsOneWidget);

    // Enter Dummy Credentials
    await tester.enterText(
      find.ancestor(
        of: find.text('Username (Ext)'),
        matching: find.byType(TextFormField),
      ),
      '101',
    );
    await tester.enterText(
      find.ancestor(
        of: find.text('Password'),
        matching: find.byType(TextFormField),
      ),
      'secret',
    );
    await tester.enterText(
      find.ancestor(
        of: find.text('Domain (IP/Host)'),
        matching: find.byType(TextFormField),
      ),
      'sip.example.com',
    );
    await tester.pump();

    // Tap Connect
    await tester.tap(find.text('Connect'));
    await tester.pumpAndSettle();

    // Verify navigation to Call Screen
    expect(find.text('AnswerForMe Active'), findsOneWidget);
    expect(find.textContaining('Status: registered'), findsOneWidget);
  });
}
