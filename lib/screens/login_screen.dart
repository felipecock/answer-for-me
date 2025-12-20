import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/sip_account.dart';
import '../services/sip_service.dart';
import 'call_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();
  final _domainController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final sipService = context.watch<SipService>();

    return Scaffold(
      appBar: AppBar(title: const Text('SIP Login')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              if (sipService.lastError != null)
                Text(
                  sipService.lastError!,
                  style: const TextStyle(color: Colors.red),
                ),
              TextFormField(
                controller: _usernameController,
                decoration: const InputDecoration(labelText: 'Username (Ext)'),
                validator: (value) => value!.isEmpty ? 'Required' : null,
              ),
              TextFormField(
                controller: _passwordController,
                decoration: const InputDecoration(labelText: 'Password'),
                obscureText: true,
                validator: (value) => value!.isEmpty ? 'Required' : null,
              ),
              TextFormField(
                controller: _domainController,
                decoration: const InputDecoration(
                  labelText: 'Domain (IP/Host)',
                ),
                validator: (value) => value!.isEmpty ? 'Required' : null,
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: sipService.state == SipState.registering
                    ? null
                    : () async {
                        if (_formKey.currentState!.validate()) {
                          final account = SipAccount(
                            username: _usernameController.text,
                            password: _passwordController.text,
                            domain: _domainController.text,
                          );

                          await context.read<SipService>().register(account);

                          if (context.mounted &&
                              sipService.state == SipState.registered) {
                            Navigator.of(context).pushReplacement(
                              MaterialPageRoute(
                                builder: (_) => const CallScreen(),
                              ),
                            );
                          }
                        }
                      },
                child: sipService.state == SipState.registering
                    ? const CircularProgressIndicator()
                    : const Text('Connect'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
