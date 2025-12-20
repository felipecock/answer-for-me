class SipAccount {
  final String username;
  final String password;
  final String domain;
  final int port;
  final String displayName;

  SipAccount({
    required this.username,
    required this.password,
    required this.domain,
    this.port = 5060,
    this.displayName = 'AnswerForMe',
  });

  String get uri => 'sip:$username@$domain:$port';
}
