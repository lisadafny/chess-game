$(document).ready(function () {
    createChessBoard();
    insertChessPieces();
    dragChessPieces();
    dropChessPieces();
});

function createChessBoard(){
    let row = '';
    for(let i = 0; i < 64; i++){
        if((7 < i && i < 16) || (23 < i && i < 32) || (39 < i && i < 48) || 55 < i)
            row = 'row-opposite-color';
        else
            row = 'row-normal-color';

        $('#chessBoard').append(`<div class="chess-square ${row}"></div>`);
    }
}

function insertChessPieces(){

    const rookB = `<i class="fa-solid fa-chess-rook chess-piece black fa-3x"></i>`;
    const knightB = `<i class="fa-solid fa-chess-knight chess-piece black fa-3x"></i>`;
    const bishopB = `<i class="fa-solid fa-chess-bishop chess-piece black fa-3x"></i>`;
    const kingB = `<i class="fa-solid fa-chess-king chess-piece black fa-3x"></i>`;
    const queenB = `<i class="fa-solid fa-chess-queen chess-piece black fa-3x"></i>`;
    const pawnB = `<i class="fas fa-chess-pawn chess-piece black fa-3x"></i>`;

    const rookW = `<i class="fa-solid fa-chess-rook chess-piece white fa-3x"></i>`;
    const knightW = `<i class="fa-solid fa-chess-knight chess-piece white fa-3x"></i>`;
    const bishopW = `<i class="fa-solid fa-chess-bishop chess-piece white fa-3x"></i>`;
    const kingW = `<i class="fa-solid fa-chess-king chess-piece white fa-3x"></i>`;
    const queenW = `<i class="fa-solid fa-chess-queen chess-piece white fa-3x"></i>`;
    const pawnW = `<i class="fas fa-chess-pawn chess-piece white fa-3x"></i>`;

    $('.chess-square:eq(0)').append(rookB);
    $('.chess-square:eq(1)').append(knightB);
    $('.chess-square:eq(2)').append(bishopB);
    $('.chess-square:eq(3)').append(kingB);
    $('.chess-square:eq(4)').append(queenB);
    $('.chess-square:eq(5)').append(bishopB);
    $('.chess-square:eq(6)').append(knightB);
    $('.chess-square:eq(7)').append(rookB);
    $('.chess-square:eq(8)').append(pawnB);
    $('.chess-square:eq(9)').append(pawnB);
    $('.chess-square:eq(10)').append(pawnB);
    $('.chess-square:eq(11)').append(pawnB);
    $('.chess-square:eq(12)').append(pawnB);
    $('.chess-square:eq(13)').append(pawnB);
    $('.chess-square:eq(14)').append(pawnB);
    $('.chess-square:eq(15)').append(pawnB);

    $('.chess-square:eq(63)').append(rookW);
    $('.chess-square:eq(62)').append(knightW);
    $('.chess-square:eq(61)').append(bishopW);
    $('.chess-square:eq(60)').append(kingW);
    $('.chess-square:eq(59)').append(queenW);
    $('.chess-square:eq(58)').append(bishopW);
    $('.chess-square:eq(57)').append(knightW);
    $('.chess-square:eq(56)').append(rookW);
    $('.chess-square:eq(55)').append(pawnW);
    $('.chess-square:eq(54)').append(pawnW);
    $('.chess-square:eq(53)').append(pawnW);
    $('.chess-square:eq(52)').append(pawnW);
    $('.chess-square:eq(51)').append(pawnW);
    $('.chess-square:eq(50)').append(pawnW);
    $('.chess-square:eq(49)').append(pawnW);
    $('.chess-square:eq(48)').append(pawnW);
}

function dragChessPieces(){
    $('.chess-piece').draggable({
        containment: "#chessBoard",
        cursor: "move", cursorAt: { top: 24, left: 15 },
        drag: function (event, ui){
            $(event.target).css('position', 'absolute');
        }
    });
}

function dropChessPieces(){
    $(".chess-square").droppable({
        drop: function (event, ui) {
            let taskCard = ui.helper;
            let section = event.target;
            $(section).children().remove();
            $(taskCard).appendTo($(section));
            $(taskCard).css('position', 'static');
        }
    });
}