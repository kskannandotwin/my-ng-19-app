import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadService } from '../../services/file-upload.service';
import { FileUpload } from '../../models/file-upload';
import { FileListComponent } from '../file-list/file-list.component';
import { UploadZoneComponent } from '../upload-zone/upload-zone.component';

@Component({
  selector: 'app-file-upload',
  imports: [CommonModule, FileListComponent, UploadZoneComponent],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  uploads: FileUpload[] = [];

  constructor(private fileUploadService: FileUploadService) {}

  onFileSelected(files: FileList): void {
    Array.from(files).forEach(file => {
      const upload: FileUpload = {
        id: crypto.randomUUID(),
        file,
        name: file.name,
        progress: 0,
        status: 'pending'
      };
      
      this.uploads.push(upload);
      this.uploadFile(upload);
    });
  }

  onDeleteFile(fileId: string): void {
    this.uploads = this.uploads.filter(upload => upload.id !== fileId);
  }

  onEditFileName(data: { id: string; newName: string }): void {
    const upload = this.uploads.find(u => u.id === data.id);
    if (upload) {
      upload.name = data.newName;
    }
  }

  private uploadFile(upload: FileUpload): void {
    upload.status = 'uploading';
    this.fileUploadService.upload(upload.file).subscribe({
      next: (progress) => {
        upload.progress = progress;
        if (progress === 100) {
          upload.status = 'done';
        }
      },
      error: () => {
        upload.status = 'error';
      }
    });
  }
}