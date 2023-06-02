import {Component, inject, OnInit} from '@angular/core';
import {ref, Storage, uploadBytesResumable, getStorage, getDownloadURL} from '@angular/fire/storage';


@Component({
  selector: 'app-image-upload',
  styleUrls: ['./image-upload.component.scss'],
  template: `
        <input id="fileUpload" type="file" #upload >
        <button (click)="uploadFile(upload)">Upload</button>
    `,
})


export class ImageUploadComponent  implements OnInit {
  srcImage: any;
  private readonly storage: Storage = inject(Storage);
  uploadFile(input: HTMLInputElement) {
    if (!input.files) return

    const files: FileList = input.files;

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const storageRef = ref(this.storage, file.name);
        console.log(storageRef)

        uploadBytesResumable(storageRef, file);
        this.getfile(file.name);

      }
    }

  }
  async getfile(file:any){
    let coverText = document.getElementById('coverText')
    if (coverText != null){
    coverText.setAttribute('value',file)}

    const storage = getStorage();
   await getDownloadURL(ref(storage, 'gs://imdb-eba1c.appspot.com/' + file))

      .then((url) => {
        const img = document.getElementById('cover');
        let coverText = document.getElementById('coverText')
        if(img != null){
          this.srcImage = url;
          img.setAttribute('src', url);
          console.log('test')
        }
        }
      )

  }



  ngOnInit() {}

}
