

//MOVEiTEM FUNCTION, which takes the source array and two indices that it will swap.
export  const moveItem = <T>(array:T[], from:number, to:number) => {
    const startIndex = to< 0 ? array.length + to:to;
    const item = array.splice(from, 1)[0]
    array.splice(startIndex, 0, item)
    return array
}
//we want to be able to work with arrays with any kind of items in them,so we use a generic type T.
//then we calculate the satrtIndex.we make sure that its always apositive number.
//if our destination index is smaller than zero, we use array length plus the destination index.
//we do this because if u pass anegative index to splice function it will begin that many elements from
//the end ,so we can end up adding an item to the wrong spot

//==after we've calculated the startIndex that is always apositive number we can move items around
//.first we remove  the item with the from index and store it in the item const
//then we insert that item at startIndex position