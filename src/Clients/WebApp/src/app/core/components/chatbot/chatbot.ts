import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  suggestions?: string[];
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css']
})
export class Chatbot implements AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  isOpen = false;
  isTyping = false;
  userMessage = '';
  hasUnread = true;

  messages: ChatMessage[] = [
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Merhaba! 👋 Ben Agentic Alışveriş Danışmanın. Bütçene veya zevkine göre ürün arayabilir, en popüler kategorileri sorabilirsin. Sana nasıl yardımcı olabilirim?',
      time: this.getCurrentTime(),
      suggestions: [
        '🎧 2000 TL altı kablosuz kulaklık',
        '👕 Popüler giyim ürünleri',
        '🏷️ En çok satan kategoriler'
      ]
    }
  ];

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.hasUnread = false;
      setTimeout(() => this.scrollToBottom(), 50);
    }
  }

  sendMessage(textToSend?: string): void {
    const text = (textToSend || this.userMessage).trim();
    if (!text || this.isTyping) return;

    // Kullanıcı mesajını ekle
    this.messages.push({
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      time: this.getCurrentTime()
    });

    this.userMessage = '';
    this.isTyping = true;
    setTimeout(() => this.scrollToBottom(), 50);

    // AI Yanıt Simülasyonu (İleride Search.API / Agent servisine bağlanacak)
    setTimeout(() => {
      this.isTyping = false;
      this.messages.push(this.generateResponse(text));
      setTimeout(() => this.scrollToBottom(), 50);
    }, 1000);
  }

  selectSuggestion(suggestion: string): void {
    this.sendMessage(suggestion);
  }

  private generateResponse(userText: string): ChatMessage {
    const lower = userText.toLowerCase();
    let reply = 'Talebinizi aldım! Akıllı arama modelimiz üzerinde semantik eşleştirme yapıyorum...';
    let suggestions: string[] | undefined = undefined;

    if (lower.includes('kulaklık') || lower.includes('bluetooth') || lower.includes('kablosuz')) {
      reply = 'Semantik arama sonuçlarına göre senin için en popüler kulaklıkları buldum:\n\n' +
              '🎧 Sony WH-CH520 — 1.499 TL (4.8 ★)\n' +
              '🎧 JBL Tune 520BT — 1.699 TL (4.7 ★)\n\n' +
              'Detaylı özellikler veya fiyata göre sıralama ister misin?';
      suggestions = ['Sony özelliklerini göster', 'Fiyata göre sırala', 'Başka ürün ara'];
    } else if (lower.includes('kategori') || lower.includes('popüler')) {
      reply = 'Şu an platformumuzda en çok ilgi gören kategoriler:\n\n' +
              '• 📱 Elektronik & Aksesuar\n' +
              '• 👗 Kadın / Erkek Moda\n' +
              '• 🏠 Ev & Yaşam\n\n' +
              'Hangi kategoriye göz atmak istersin?';
      suggestions = ['Elektronik ürünleri', 'Giyim kategorisi'];
    } else if (lower.includes('giyim') || lower.includes('tişört') || lower.includes('elbise')) {
      reply = 'Trend giyim ürünlerinden bazı öneriler:\n\n' +
              '👕 Basic Pamuklu Tişört Siyah — 299 TL\n' +
              '👖 Slim Fit Denim Pantolon — 749 TL\n\n' +
              'Belirli bir beden veya renk arıyor musun?';
    }

    return {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      text: reply,
      time: this.getCurrentTime(),
      suggestions
    };
  }

  private getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  ngAfterViewChecked(): void {
    // Mesajlar eklendikçe otomatik kaydır
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch (_) {}
  }
}
