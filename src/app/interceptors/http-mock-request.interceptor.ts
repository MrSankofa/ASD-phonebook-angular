import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as storage from '../data.json';
import { Contact } from '../components/contacts/contact';  // Import your Contact type

const urls = [
    {
        url: "http://localhost:8080/api/contact",
        method: 'GET',
        getData: (request: HttpRequest<unknown>, id?: string) => {
            return storage.data;
        }
    },
    {
        url: "http://localhost:8080/api/contact",
        method: 'POST',
        getData: (request: HttpRequest<unknown>, id?: string) => {
            const contact = request.body as Contact;
            contact.id = storage.data.length + 1;
            // storage.data.push(contact);
            return contact;
        }
    },
    // For individual contact retrieval
    {
        url: "http://localhost:8080/api/contact/#",
        method: 'GET',
        getData: (request: HttpRequest<unknown>, id: string) => {
            return storage.data.find((item: Contact) => item.id + "" === id);
        }
    },
    {
        url: "http://localhost:8080/api/contact/#",
        method: 'PUT',
        getData: (request: HttpRequest<unknown>, id: string) => {
            const contact = request.body as Contact;
            const foundItem = storage.data.find((item: Contact) => item.id + "" === id);
            if (foundItem) {
                Object.assign(foundItem, contact);
            }
            return foundItem;
        }
    }
];


export const mockInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    for (const element of urls) {
        if (req.method === element.method) {
            if (req.url === element.url) {
                return of(new HttpResponse({ status: 200, body: element.getData(req, "1") }));
            } else {
                const url = new URL(req.url);
                const id = url.pathname.replace("/api/contact/", "");
                if (id && url.origin + "/api/contact/#" === element.url) {
                    return of(new HttpResponse({ status: 200, body: element.getData(req, id) }));
                }
            }
        }
    }

    console.warn("No mock handler found for", req.url, req.method);
    return next(req);
};
