const { ccclass, property } = cc._decorator;

@ccclass
export default class Tile extends cc.Component {
  @property({ type: [cc.SpriteFrame], visible: true })
  private textures = [];

  async onLoad(): Promise<void> {
    await this.loadTextures();
  }

  async resetInEditor(): Promise<void> {
    await this.loadTextures();
    this.setRandom();
  }

  async loadTextures(): Promise<boolean> {
    const self = this;
    return new Promise<boolean>(resolve => {
      cc.loader.loadResDir('gfx/Square', cc.SpriteFrame, function afterLoad(err, loadedTextures) {
        self.textures = loadedTextures;
        resolve(true);
      });
    });
  }

  playGlow() : void
  {
    let anim : cc.Animation;
    anim = this.getComponentInChildren(cc.Animation);
    anim.play();  
  }

  stopGlow() : void
  {
    let anim : cc.Animation;
    anim = this.getComponentInChildren(cc.Animation);
    anim.setCurrentTime(0);
    anim.stop();      
  }

  setTile(index: number): void {
    this.node.getComponent(cc.Sprite).spriteFrame = this.textures[index];
  }

  setRandom(): void {
    const randomIndex = Math.floor(Math.random() * this.textures.length);
    this.setTile(randomIndex);
  }
}
