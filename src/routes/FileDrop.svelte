<!-- FileDrop.svelte -->
<script>
    import { onMount } from 'svelte';
    import * as XLSX from 'xlsx';
    import saveAs from 'file-saver'; // Correct import
  
    /**
     * @type {Blob}
     */
    let file;
  
    /**
     * @param {{ preventDefault: () => void; dataTransfer: { files: any; }; }} event
     */
    function handleDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        handleFile(files[0]);
      }
    }
  
    /**
     * @param {Blob} selectedFile
     */
    function handleFile(selectedFile) {
      file = selectedFile;
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        console.log(json); // Do something with the data
      };
      reader.readAsArrayBuffer(selectedFile);
    }
  
    function handleDragOver(event) {
      event.preventDefault();
    }
  
    function handleButtonClick() {
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const csv = XLSX.utils.sheet_to_csv(worksheet);
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          saveAs(blob, 'converted.csv'); // Use the correct saveAs function
        };
        reader.readAsArrayBuffer(file);
      }
    }
  </script>
  
  <div
    on:drop={handleDrop}
    on:dragover={handleDragOver}
    class="dropbox"
  >
    Drop your Excel file here 
    <input type="file" accept=".xlsx, .xls" on:change="{(e) => handleFile(e.target.files[0])}" />
  </div>
  <button on:click={handleButtonClick}>Convert to CSV</button>
  
  <style>
    .dropbox {
      border: 2px dashed #ccc;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      margin: 20px 0;
    }
    .dropbox input {
      display: none;
    }
  </style>
  