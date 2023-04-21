let allChessSquares = '';
let allChessWhitePieces = $('.chess-piece.white');
let allChessBlackPieces = $('.chess-piece.black');
const allChessPieces = $('.chess-piece');
const arrCol = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

$(document).ready(function () {
    createChessBoard();
    insertChessPieces();
    dragChessPieces();
    dropChessPieces();
    $('.fa-chess-pawn').addClass('first-move');
    allChessSquares = $('.chess-square');
    allChessWhitePieces = $('.chess-piece.white');
    allChessBlackPieces = $('.chess-piece.black');
    allChessWhitePieces.on('click', movableAreas);
    allChessWhitePieces.addClass('can-move');
});

function createChessBoard() {
    let position = '';

    for (let i = 0; i < 64; i++) {

        if (i < 8)
            position = `row-8 col-${arrCol[i]}`;

        if (8 <= i && i < 16)
            position = `row-7 col-${arrCol[i - 8]}`;

        if (16 <= i && i < 24)
            position = `row-6 col-${arrCol[i - 16]}`;

        if (24 <= i && i < 32)
            position = `row-5 col-${arrCol[i - 24]}`;

        if (32 <= i && i < 40)
            position = `row-4 col-${arrCol[i - 32]}`;

        if (40 <= i && i < 48)
            position = `row-3 col-${arrCol[i - 40]}`;

        if (48 <= i && i < 56)
            position = `row-2 col-${arrCol[i - 48]}`;

        if (56 <= i)
            position = `row-1 col-${arrCol[i - 56]}`;

        $('#chessBoard').append(`<div class="chess-square ${position}"></div>`);
    }
}

function insertChessPieces() {

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

function dragChessPieces() {
    $('.chess-piece').draggable({
        containment: "#chessBoard",
        cursor: "move", cursorAt: { top: 24, left: 15 },
        drag: function (event, ui) {
            $(event.target).css('position', 'absolute');
        }
    });
}

function dropChessPieces() {
    $(".chess-square").droppable({
        drop: function (event, ui) {
            let taskCard = ui.helper;
            let section = event.target;
            scoreMaker($(section).children());
            $(section).children().remove();
            $(taskCard).appendTo($(section));
            $(taskCard).css('position', 'static');
        }
    });
}

function movableAreas(event) {
    const piece = $(event.target);
    const chessSquare = piece.parent();
    chessSquare.addClass('selected');
    const classes = chessSquare.attr('class').split(' ');
    const file = classes.filter((x) => x.startsWith('col'))[0];
    const rank = classes.filter((x) => x.startsWith('row'))[0];
    const isPawn = piece.hasClass('fa-chess-pawn');
    allChessSquares.on('click', (event) => pieceToMove(event, piece));
    event.stopPropagation();
    if (isPawn) {
        movePawn(piece, rank, file);
        return;
    }
}

function movePawn(piece, rank, file) {
    const rowPosition = + rank.charAt(4);
    const colPosition = file.charAt(4);
    const colIndex = arrCol.indexOf(colPosition);
    const isFirstMove = piece.hasClass('first-move');
    const isWhite = piece.hasClass('white');
    if (isWhite) {
        const oneUp = $(`.${file}.row-${rowPosition + 1}`);
        const twoUp = $(`.${file}.row-${rowPosition + 2}`);
        const diagonalLeft = $(`.col-${arrCol[colIndex - 1]}.row-${rowPosition + 1}`);
        const diagonalright = $(`.col-${arrCol[colIndex + 1]}.row-${rowPosition + 1}`);
        console.log(oneUp);
        console.log(twoUp);
        if (!oneUp.children().length)
            oneUp.addClass('can-move');
        if (isFirstMove && !twoUp.children().length)
            twoUp.addClass('can-move');
        if (diagonalLeft.children().length)
            diagonalLeft.addClass('can-move');
        if (diagonalright.children().length)
            diagonalright.addClass('can-move');
    }
}
function scoreMaker(piece) {
    console.log(piece);
    console.log("not implement yet");
}
function pieceToMove(event, element) {
    const isWhite = $(element).hasClass('white');
    const chessSquare = $(event.target);
    const selectedChessSquare = $('.chess-square.selected');
    const canMoveChessSquare = $('.chess-square.can-move');
    const pieceAtSquare = chessSquare.children();
    let boolMoved = false;
    canMove = chessSquare.hasClass('can-move');
    if (canMove) {
        if (pieceAtSquare.length) {
            scoreMaker(pieceAtSquare);
            pieceAtSquare.remove();
        }
        chessSquare.append(element);
        element.removeClass('first-move');
        boolMoved = true;
    }
    canMoveChessSquare.removeClass('can-move');
    selectedChessSquare.removeClass('selected');
    if (!boolMoved)
        return;
    allChessSquares.off('click', '**');
    if (isWhite) {
        // allChessWhitePieces.off('click', '**');
        // allChessBlackPieces.on('click', movableAreas);
        return;
    }
    allChessBlackPieces.off('click', '**');
    allChessWhitePieces.on('click', movableAreas);
}