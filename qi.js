const app=new Vue({
    el:'#box',
    data:{
        pan: Array(10).fill(""),
        turns:0,
        usingAI:false,
        currentPlayer: "X",
    },
    methods:{
        placexo(p){
            if(this.pan[p]!=""){
                alert("此位置已有棋子!");
                return;
            }
            this.$set(this.pan, p, this.currentPlayer);
            setTimeout(() => {
                if (this.isWin()){
                alert(`玩家 ${this.currentPlayer} 获胜!`);
                this.currentPlayer='X';
                this.clear();
                return;
            }
            let t=this.pan
            if (!this.pan.slice(1).includes("")) {
                alert("平局!");
                this.clear();
                return;
            }
            this.turns = 1 - this.turns;
            this.switchPlayer();
            }, 10);
        },
        switchPlayer() {
                this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
                if (this.usingAI && this.currentPlayer === "O") {
                    this.AI();
                }
            },
        isWin() {
            const winPatterns = [
                [1, 2, 3], // 第一行
                [4, 5, 6], // 第二行
                [7, 8, 9], // 第三行
                [1, 4, 7], // 第一列
                [2, 5, 8], // 第二列
                [3, 6, 9], // 第三列
                [1, 5, 9], // 主对角线
                [3, 5, 7]  // 副对角线
            ];
            //也就井字棋可以穷举了
            // 9个格子的情况，所以可以用 9*9 = 81 次循环来枚举
            for (let pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (this.pan[a] && this.pan[a] === this.pan[b] && this.pan[b] === this.pan[c]) {
                    return true;
                }
            }
            return false;
        },
        clear(){
            this.pan=Array(10).fill("");
            this.turns=0;
            this.usingAI=false;
        },
        AI(){
            this.usingAI=true;
            if(this.currentPlayer=="X") return;
            setTimeout(() => {
            const p=Math.floor(Math.random()*9)+1;
            if(this.pan[p]==""){
                this.placexo(p);
            }else{
                this.AI();
            }
            }, 100);
           
        }
    },
    })