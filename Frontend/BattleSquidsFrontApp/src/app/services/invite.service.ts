import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Invite } from '../models/invite';

@Injectable({
  providedIn: 'root'
})
export class InviteService {
    webSocket!: WebSocket;
    invite!: Invite;
    url: string;

    constructor(private http: HttpClient, private urlService: UrlService) { 
        this.url = urlService.getUrl() + "/invites";
    }

    public openInviteWebSocket() {
        this.webSocket = new WebSocket('ws://localhost:8080/BattleSquids/inviteaction');

        this.webSocket.onopen = (event) => {
            console.log('Open: ', event);
        };

        this.webSocket.onmessage = (event) => {
            const invite = JSON.parse(event.data);
            console.log(invite);
        };

        this.webSocket.onclose = (event) => {
            console.log('Close: ', event);
        };
    }

    public sendInvite(invite: Invite) {
        this.webSocket.send(JSON.stringify(invite));
    }

    public closeInviteWebSocket() {
        this.webSocket.close()
    }

    public ngOnDestroy() {
        this.webSocket.close();
    }

    //no reason to get all invites really; instead:

    getAllInvitesForGameWithId(gameId: number): Observable<Invite[]>{
        return this.http.get(this.url + `?game_id=${gameId}`).pipe(map(resp => resp as Invite[]));
    }

    getAllInvitesSentByUserWithId(userId: number): Observable<Invite[]>{
        return this.http.get(this.url + `?sender_id=${userId}`).pipe(map(resp => resp as Invite[]));
    }

    getAllInvitesReceivedByUserWithId(userId: number): Observable<Invite[]>{
        return this.http.get(this.url + `?receiver_id=${userId}`).pipe(map(resp => resp as Invite[]));
    }

    getInviteById(id: number): Observable<Invite>{
        return this.http.get(this.url + `/${id}`).pipe(map(resp => resp as Invite));
    }

    addInvite(invite: Invite): Observable<number> {
        return this.http.post(this.url, invite).pipe(map(resp => resp as number));
    }

    updateInvite(invite: Invite): Observable<object> {
        return this.http.put(this.url, invite).pipe();
    }

    deleteBoard(id: number): Observable<object> {
        return this.http.delete(this.url + `/${id}`).pipe();
    }
}