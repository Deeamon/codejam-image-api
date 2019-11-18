/* eslint-disable no-underscore-dangle */
/* eslint-disable max-classes-per-file */

class ButtonFeature {
  get buttonClass() {
    return this._buttonClass;
  }

  get nameButton() {
    return this._nameButton;
  }

  get nameColorButton() {
    return this._nameColorButton;
  }

  get buttonID() {
    return this._buttonID;
  }

  get buttonColorClass() {
    return this._buttonColorClass;
  }

  constructor(
    buttonClass,
    nameButton,
    nameColorButton,
    buttonID,
    buttonColorClass = 'item__icon--circle',
  ) {
    this._buttonClass = buttonClass;
    this._nameButton = nameButton;
    this._nameColorButton = nameColorButton;
    this._buttonID = buttonID;
    this._buttonColorClass = buttonColorClass;
  }
}

class ButtonTools {
  get button1() {
    return this._button1;
  }

  get button2() {
    return this._button2;
  }

  get button3() {
    return this._button3;
  }

  get button4() {
    return this._button4;
  }

  get button5() {
    return this._button5;
  }

  constructor(
    button1,
    button2,
    button3,
    button4,
    button5,
  ) {
    this._button1 = button1;
    this._button2 = button2;
    this._button3 = button3;
    this._button4 = button4;
    this._button5 = button5;
  }
}

class PictureCanvas {
  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get scale() {
    return this._scale;
  }

  get color() {
    return this._color;
  }

  constructor(
    width,
    height,
    colorMatrix,
  ) {
    this._width = width;
    this._height = height;
    this._scale = colorMatrix.scale;
    this._color = colorMatrix.colors;
  }
}

class ColorMatrix {
  get scale() {
    return this._scale;
  }

  get colors() {
    return this._colors;
  }

  constructor(
    scale,
    colors,
  ) {
    this._scale = scale;
    if (!Array.isArray(colors)) {
      throw new Error('colors should be type of array');
    }
    if (colors.length !== scale) {
      throw new Error('number of colors should be equel scale');
    }
    colors.forEach((color) => {
      if (!Array.isArray(color)) {
        throw new Error('colors should be type of array');
      }
      if (color.length !== scale) {
        throw new Error('number of colors should be equel scale');
      }
    });
    this._colors = colors;
  }
}

class elementForListener {
  get panelToolsRef() {
    return this._panelToolsRef;
  }

  get panelColorsRef() {
    return this._panelColorsRef = panelColorsRef;
  }

  get panelSearchRef() {
    return this._panelSearchRef = panelSearchRef
  }

  get canvas() {
    return this._canvas;
  }

  get panelSizesRef() {
    return this._panelSizesRef;
  }

  constructor(
    panelToolsRef,
    panelColorsRef,
    panelSearchRef,
    canvas,
    panelSizesRef,
  ) {
    this._panelToolsRef = panelToolsRef;
    this._panelColorsRef = panelColorsRef;
    this._panelSearchRef = panelSearchRef;
    this._canvas = canvas;
    this._panelSizesRef = panelSizesRef;
  }
}

class Render {
  render(buttonTools, picture) {
    this._renderHeader();

    const mainRef = document.createElement('main');
    mainRef.className = 'main';

    const panelToolsRef = document.createElement('div');
    panelToolsRef.className = 'panel__tools';

    this._renderTools(panelToolsRef, buttonTools.button1);
    this._renderTools(panelToolsRef, buttonTools.button2);
    this._renderTools(panelToolsRef, buttonTools.button3);
    this._renderTools(panelToolsRef, buttonTools.button4);
    this._renderTools(panelToolsRef, buttonTools.button5);
    mainRef.append(panelToolsRef);

    const panelColorsRef = document.createElement('div');
    panelColorsRef.className = 'panel__colors';

    panelColorsRef.addEventListener('click', (event) => {
      const btn = event.target.closest('button');
      if (!btn) { return; }
      console.log(btn);
      // this.selectButton(btn);
    });


    this._renderColorsInput(panelColorsRef, buttonTools.button1);
    this._renderColors(panelColorsRef, buttonTools.button2);
    this._renderColors(panelColorsRef, buttonTools.button3);
    this._renderColors(panelColorsRef, buttonTools.button4);
    mainRef.append(panelColorsRef);

    const panelSearchRef = document.createElement('div');
    panelSearchRef.className = 'panel__search';
    this._renderSearch(mainRef, panelSearchRef);

    const canvas = document.createElement('canvas');
    this._renderPicture(mainRef, canvas, picture);

    const panelSizesRef = document.createElement('div');
    panelSizesRef.className = 'panel__sizes';
    this._renderSizes(mainRef, panelSizesRef);

    document.body.append(mainRef);

    return new elementForListener(
      panelToolsRef,
      panelColorsRef,
      panelSearchRef,
      canvas,
      panelSizesRef,
    );
  }

  _renderHeader() {
    const headerRef = document.createElement('header');
    headerRef.className = 'header';

    const menuRef = document.createElement('div');
    menuRef.className = 'menu';
    const menuIconRef = document.createElement('div');
    menuIconRef.className = 'menu__icon';
    const menuTitleRef = document.createElement('h1');
    menuTitleRef.className = 'menu__title';
    menuTitleRef.innerText = 'CodeJam - Pallete';

    menuRef.append(menuIconRef);
    menuRef.append(menuTitleRef);

    const iconBallRef = document.createElement('div');
    iconBallRef.className = 'icon-ball';

    headerRef.append(menuRef);
    headerRef.append(iconBallRef);

    document.body.prepend(headerRef);
    this._headerRef = headerRef;
  }

  _renderTools(
    panelToolsRef,
    { buttonClass, nameButton, buttonID },
  ) {
    const itemRef = document.createElement('button');
    itemRef.className = 'item';
    itemRef.id = buttonID;

    const itemIcon = document.createElement('div');
    itemIcon.className = 'item__icon';
    itemIcon.classList.add(buttonClass);

    const itemText = document.createElement('div');
    itemText.className = 'item__text';
    itemText.innerText = nameButton;

    itemRef.append(itemIcon);
    itemRef.append(itemText);

    panelToolsRef.append(itemRef);
    this._panelToolsRef = panelToolsRef;
  }

  _renderSearch(
    mainRef,
    panelSearchRef
  ) {

    const buttonLoad = document.createElement('button');
    buttonLoad.className = 'search__button';
    buttonLoad.classList.add('search__button--load');
    buttonLoad.type = 'submit';
    buttonLoad.id = 'buttonLoad';
    buttonLoad.innerText = 'Load';

    const input = document.createElement('input');
    input.className = 'search__input';
    input.type = 'search';
    input.id = 'searchVal';
    input.placeholder = 'Input the city';

    const buttonBW = document.createElement('button');
    buttonBW.className = 'search__button';
    buttonBW.classList.add('search__button--BW');
    buttonBW.id = 'bw';
    buttonBW.innerText = 'B&W';

    panelSearchRef.append(buttonLoad);
    panelSearchRef.append(input);
    panelSearchRef.append(buttonBW);

    mainRef.append(panelSearchRef);
    this._panelSearchRef = panelSearchRef;
  }

  _renderSizes(
    mainRef,
    panelSizes,
  ) {

    const item1 = document.createElement('button');
    item1.className = 'item';
    item1.id = 'draw4x4';
    const item1Icon = document.createElement('div');
    item1Icon.className = 'item__icon--square';
    const item1Text = document.createElement('div');
    item1Text.innerText = '4 x 4';

    item1.append(item1Icon);
    item1.append(item1Text);

    const item2 = document.createElement('button');
    item2.className = 'item';
    item2.id = 'draw32x32';
    const item2Icon = document.createElement('div');
    item2Icon.className = 'item__icon--square';
    const item2Text = document.createElement('div');
    item2Text.innerText = '32 x 32';

    item2.append(item2Icon);
    item2.append(item2Text);

    const item3 = document.createElement('button');
    item3.className = 'item';
    item3.id = 'draw256x256';
    const item3Icon = document.createElement('div');
    item3Icon.className = 'item__icon--square';
    const item3Text = document.createElement('div');
    item3Text.innerText = '256 x 256';

    item3.append(item3Icon);
    item3.append(item3Text);

    const item4 = document.createElement('button');
    item4.className = 'item';
    item4.classList.add('clear');
    item4.id = 'clear';
    const item4Text = document.createElement('div');
    item4Text.innerText = 'Clear';

    item4.append(item4Text);

    panelSizes.append(item1);
    panelSizes.append(item2);
    panelSizes.append(item3);
    panelSizes.append(item4);

    mainRef.append(panelSizes);

    this._panelSizes = panelSizes;
  }

  _renderColorsInput(
    panelColorsRef,
    { buttonColorClass, nameColorButton },
  ) {
    const itemRef = document.createElement('button');
    itemRef.className = 'item';

    const itemIcon = document.createElement('input');
    itemIcon.className = buttonColorClass;

    const name = 'currentColor';
    itemIcon.setAttribute('name', name);
    itemIcon.type = 'color';
    itemIcon.value = '#f6b73c';

    const itemText = document.createElement('label');
    itemText.setAttribute('for', name);
    itemText.innerText = nameColorButton;


    itemRef.append(itemIcon);
    itemRef.append(itemText);

    panelColorsRef.append(itemRef);
    this._panelColorsRef = panelColorsRef;
  }

  _renderColors(
    panelColorsRef,
    { buttonColorClass, nameColorButton },
  ) {
    const itemRef = document.createElement('button');
    itemRef.className = 'item';

    const itemIcon = document.createElement('div');
    itemIcon.className = buttonColorClass;

    const itemText = document.createElement('div');
    itemText.innerText = nameColorButton;

    itemRef.append(itemIcon);
    itemRef.append(itemText);

    panelColorsRef.append(itemRef);
    this._panelColorsRef = panelColorsRef;
  }

  _renderPicture(
    mainRef,
    pictureRef,
    { width, height, scale, color }
  ) {

    pictureRef.id = 'canvas';
    pictureRef.className = 'display';
    pictureRef.width = width;
    pictureRef.height = height;

    mainRef.append(pictureRef);


    this._pictureRef = pictureRef;
  }
}

class App {
  constructor() {
    this._render = new Render();
  }

  execute() {
    const buttonTools = new ButtonTools(
      new ButtonFeature(
        'item__icon--paint-bucket',
        'Paint bucket',
        'Current color',
        'paint-bucket',
      ),
      new ButtonFeature(
        'item__icon--choose-color',
        'Choose color',
        'Prev color',
        'choose-color',
      ),
      new ButtonFeature(
        'item__icon--icon-move',
        'Move',
        'red',
        'move-btn',
      ),
      new ButtonFeature(
        'item__icon--transform',
        'Transform',
        'blue',
        'transform-btn',
      ),

      new ButtonFeature(
        'item__icon--pencil',
        'Pencil',
        'blue',
        'pencil',
      ),

    );

    let colorArray = [

      ["#00BCD4", "#FFEB3B", "#FFEB3B", "#00BCD4"],
      ["#FFEB3B", "#FFC107", "#FFC107", "#FFEB3B"],
      ["#FFEB3B", "#FFC107", "#FFC107", "#FFEB3B"],
      ["#00BCD4", "#FFEB3B", "#FFEB3B", "#00BCD4"]
    ];

    const colorMatrix = new ColorMatrix(4, colorArray);

    const picture = new PictureCanvas(512, 512, colorMatrix);
    const renderResult = this._render.render(
      buttonTools,
      picture,
    );

    const elements = new elementForListener();
    console.log(renderResult);

    let tool = localStorage.tool;
    let size = localStorage.size;
    let sizeCell = localStorage.sizeCell;


    renderResult.panelToolsRef.addEventListener('click', (event) => {
      selectButton(event);
    });

    renderResult.panelSizesRef.addEventListener('click', (event) => {
      selectCanvasSize(event);
      const canvas = document.getElementById('canvas');
      console.log(size);
      switch (size) {
        case 'draw4x4': {
          localStorage.sizeCell = 128;
          break;
        }
        case 'draw32x32': {
          localStorage.sizeCell = 64;
          break;
        }
        case 'draw256x256': {
          localStorage.sizeCell = 32;
          break;
        }
      }
    });

    let isDrawing = false;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let startCoord = [0, 0];

    renderResult.canvas.addEventListener('mousedown', (e) => {
      console.log(tool);
      console.log(sizeCell);

      switch (tool) {
        case 'pencil': {
          isDrawing = true;
          ctx.fillStyle = '#000000';
          startCoord = getCoordMouse(e, sizeCell);
          const [startX, startY] = startCoord;
          ctx.fillRect(startX * sizeCell, startY * sizeCell, sizeCell, sizeCell);
        } break;
      }

    });

    renderResult.canvas.addEventListener('mousemove', (e) => {
      if (!isDrawing) return;
      let currentCoord = getCoordMouse(e, sizeCell);
      draw(startCoord, currentCoord);
      startCoord = currentCoord;

    });

    renderResult.canvas.addEventListener('mouseup', (e) => {
      isDrawing = false;
    });

    renderResult.canvas.addEventListener('mouseout', (e) => {
      isDrawing = false;
    });

    console.log(renderResult);


    function getCoordMouse(event, sizeCell) {
      const x = Math.floor(event.offsetX / sizeCell);
      const y = Math.floor(event.offsetY / sizeCell);
      return [x, y];
    }

    const setPoint = (x, y) => {
      ctx.fillRect(x * sizeCell, y * sizeCell, sizeCell, sizeCell);
    }

    function draw(
      [startX, startY],
      [curX, curY],
    ) {

      const dX = Math.sign(curX - startX);
      const dY = Math.sign(curY - startY);
      const lengthX = Math.abs(curX - startX);
      const lengthY = Math.abs(curY - startY);
      let length = Math.max(lengthX, lengthY);

      if (length === 0) {
        setPoint(startX, startY);
        return;
      }

      let x = startX;
      let y = startY;
      let d = -lengthX;
      length += 1;

      if (lengthY <= lengthX) {
        while (length--) {
          setPoint(x, y);
          x += dX;
          d += 2 * lengthY;

          if (d > 0) {
            d -= 2 * lengthX;
            y += dY;
          }
        }
      } else {
        while (length--) {
          setPoint(x, y);
          y += dY;
          d += 2 * lengthX;
          if (d > 0) {
            d -= 2 * lengthY;
            x += dX;
          }
        }
      }

    }

    const img = new Image();

    document.querySelector('#buttonLoad').addEventListener('click', (e) => {
      event.preventDefault();
      ctx.fillStyle = '#e0e0e0';
      ctx.fillRect(0, 0, 512, 512);
      getLinkToImage(img).then((data) => {
        img.src = data.urls.full;
        img.width = data.width;
        img.height = data.height;
        img.crossOrigin = 'anonymous';
  
        const sign = Math.sign(img.width - img.height);
        const w0 = img.width;
        const h0 = img.height;
  
        switch (sign) {
          case 1: {
            img.width = 512;
            img.height = (h0 * 512) / w0;
            break;
          }
          case -1: {
            img.height = 512;
            img.width = (w0 * 512) / h0;
            break;
          }
        }
      });
      // console.log(img);

      img.onload = () => {
        ctx.drawImage(
          img,
          (canvas.width - img.width) / 2,
          (canvas.height - img.height) / 2,
          img.width,
          img.height,
        );
      }
    });

    document.querySelector('#clear').addEventListener('click', (e) => {
      event.preventDefault();
      ctx.fillStyle = '#e0e0e0';
      ctx.fillRect(0, 0, 512, 512);
    });

    document.querySelector('#bw').addEventListener('click', (e) => {
      img.style.display = 'none';
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const { data } = imageData;
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
      }
      ctx.putImageData(imageData, 0, 0);
    });

    async function getLinkToImage(img) {
      const town = document.querySelector('#searchVal').value || 'Minsk';
      const url = `https://api.unsplash.com/photos/random?query=town,${town}&client_id=d2271d9ed6848a1ddfce1f192b442f96d32f8816e03960b75f4a8563bde581cf`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
      
    }
    


    function selectButton(event) {
      const btn = event.target.closest('button');
      if (!btn) { return; };
      console.log(btn);
      if (btn) {
        const check = btn.classList.contains('select');
        if (check) {
          btn.classList.remove('select');
          tool = '';
          localStorage.tool = tool;
          return;
        }

        const length = event.currentTarget.children.length;
        for (let i = 0; i < length; i++) {
          event.currentTarget.children[i].classList.remove('select');
        }
        btn.classList.add('select');
        tool = btn.id;
        localStorage.tool = tool;
      }
    }

    function selectCanvasSize(event) {
      const btn = event.target.closest('button');
      if (!btn) { return; };
      console.log(btn);
      if (btn) {
        const check = btn.classList.contains('select');
        if (check) {
          btn.classList.remove('select');
          size = '';
          localStorage.size = size;
          return;
        }

        const length = event.currentTarget.children.length;
        for (let i = 0; i < length; i++) {
          event.currentTarget.children[i].classList.remove('select');
        }
        btn.classList.add('select');
        size = btn.id;
        localStorage.size = size;
      }
    }


    window.onbeforeunload = () => {
      localStorage.setItem('dataUrl', canvas.toDataURL());
    }

    if (localStorage.getItem('dataUrl')) {
      img.src = localStorage.getItem('dataUrl');
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }


  }
}

const app = new App();
app.execute();
