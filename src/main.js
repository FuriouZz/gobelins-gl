import { WebGLRenderer } from 'three';

class Main {

  static async main() {
    const renderer = new WebGLRenderer({
      canvas: document.querySelector('#webgl')
    })
    console.log(renderer);
  }

}

window.addEventListener('DOMContentLoaded', Main.main)