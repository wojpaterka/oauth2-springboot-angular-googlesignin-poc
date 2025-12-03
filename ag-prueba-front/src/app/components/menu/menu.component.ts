import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpParams } from '@angular/common/http';
import { TokenService } from '../../services/token.service';
import { customAlphabet } from 'nanoid';
import * as CryptoJS from 'crypto-js';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  authorize_uri = environment.authorized_uri;
  logout_uri = environment.logout_url;

  isLogged?: boolean;
  isAdmin?: boolean;

  params: Record<string, string> = {
    client_id: environment.client_id,
    redirect_uri: environment.redirect_uri,
    scope: environment.scope,
    response_type: environment.response_type,
    response_mode: environment.response_mode,
    code_challenge_method: environment.code_challenge_method,
  };

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {}

  onLogin(): void {
    const codeVerifier = this.generateCodeVerifier();
    this.tokenService.setVerifier(codeVerifier);
    this.params.code_challenge = this.generateCodeChallenge(codeVerifier);
    const httpParams = new HttpParams({ fromObject: this.params });
    const codeUrl = this.authorize_uri + httpParams.toString();
    location.href = codeUrl;
  }

  onLogout(): void {
    location.href = this.logout_uri;
  }

  getLogged(): void {
    this.isLogged = this.tokenService.isLogged();
    this.isAdmin = this.tokenService.isAdmin();
  }

  generateCodeVerifier(): string {
    const result = customAlphabet(CHARACTERS, 48)();
    return result;
  }

  generateCodeChallenge(codeVerifier: string): string {
    const codeVerifierHash = CryptoJS.SHA256(codeVerifier).toString(CryptoJS.enc.Base64);
    return codeVerifierHash.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  }
}
