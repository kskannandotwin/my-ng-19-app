import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUpload } from '../../models/file-upload';

@Component({
  selector: 'app-file-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.css'
})
export class FileListComponent {
  @Input() uploads: FileUpload[] = [];
  @Output() deleteFile = new EventEmitter<string>();
  @Output() editFileName = new EventEmitter<{ id: string; newName: string }>();

  isEditing: { [key: string]: boolean } = {};
  editedName: { [key: string]: string } = {};

  startEditing(upload: FileUpload): void {
    this.isEditing[upload.id] = true;
    this.editedName[upload.id] = upload.name;
    setTimeout(() => {
      const input = document.querySelector('.edit-input') as HTMLInputElement;
      if (input) {
        input.focus();
        input.select();
      }
    });
  }

  saveFileName(upload: FileUpload): void {
    if (this.isEditing[upload.id]) {
      const newName = this.editedName[upload.id]?.trim();
      if (newName && newName !== upload.name) {
        this.editFileName.emit({ id: upload.id, newName });
      }
      this.isEditing[upload.id] = false;
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'done':
        return '✓';
      case 'error':
        return '✕';
      case 'uploading':
        return '↑';
      default:
        return '•';
    }
  }
}
