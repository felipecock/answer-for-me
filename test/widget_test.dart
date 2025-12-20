import 'package:flutter_test/flutter_test.dart';
import 'package:answer_for_me/main.dart';

void main() {
  testWidgets('App launches to Login LoginScreen', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    // Note: SipService initialization might print/error in test env, but UI should render.
    await tester.pumpWidget(const AnswerForMeApp());
    await tester.pumpAndSettle();

    // Verify that we are on the Login Screen
    expect(find.text('SIP Login'), findsOneWidget);
    expect(find.text('Username (Ext)'), findsOneWidget);
  });
}
