import { atom } from "jotai"
import { userDataAtom } from "./auth-store"

export const roomsAtom = atom([])
export const roomFilterQueryAtom = atom([])
export const roomSearchQueryAtom = atom("")

export const filteredRoomsAtom = atom(get => {
  const rooms = get(roomsAtom)

  const roomFilter = get(roomFilterQueryAtom)
  const roomSearch = get(roomSearchQueryAtom)

  const userData = get(userDataAtom)

  let searchedResult = []

  if (roomFilter === "my-rooms") {
    for (var i in rooms) {
      let r = rooms[i]
      if (r.owner._id === userData.id) {
        searchedResult.push(r)
      }
    }
    return searchedResult
  }

  if (!roomSearch) {
    return rooms
  }

  return rooms.filter(room =>
    room.title.toLowerCase().includes(roomSearch.toLowerCase())
  )
})

// export const filteredRoomsSelector = selector({
//   get: ({ get }) => {
//     const rooms = get(roomsAtom)
//     const roomFilter = get(roomFilterQueryAtom)
//     const roomSearch = get(roomSearchQueryAtom)

//     let searchedResult = []

//     if (roomFilter === "my-rooms") {
//       for (var i in rooms) {
//         let r = rooms[i]
//         if (r.owner._id === userData.id) {
//           // TODO: нужно каким-то образом получить userData
//           searchedResult.push(r)
//         }
//       }
//       return searchedResult
//     }

//     if (!roomSearch) {
//       return rooms
//     }

//     return rooms.filter(room =>
//       room.title.toLowerCase().includes(roomSearch.toLowerCase())
//     )
//   },
// })
