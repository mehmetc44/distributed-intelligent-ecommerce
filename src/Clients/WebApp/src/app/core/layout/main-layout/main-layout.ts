import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Chatbot } from '../../components/chatbot/chatbot';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Header, Footer, Chatbot],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css']
})
export class MainLayout { }
