<!-- FileDrop.svelte -->
<script>
  import { onMount } from 'svelte';
  import * as XLSX from 'xlsx';
  import { db } from './firebase.js';
  import { collection, addDoc } from "firebase/firestore"; 
  
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
  async function handleFile(selectedFile) {
    file = selectedFile;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      console.log(json); // Do something with the data
      await uploadDataToFirestore(json);
    };
    reader.readAsArrayBuffer(selectedFile);
  }

  /**
   * Uploads data to Firestore
   * @param {Array} data
   */
  async function uploadDataToFirestore(data) {
    try {
      const collectionRef = collection(db, "excelData");
      for (const record of data) {
        await addDoc(collectionRef, record);
      }
      alert("Data uploaded successfully!");
    } catch (error) {
      console.error("Error uploading data: ", error);
      alert("Error uploading data. Check the console for more details.");
    }
  }
  
  function handleDragOver(event) {
    event.preventDefault();
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
