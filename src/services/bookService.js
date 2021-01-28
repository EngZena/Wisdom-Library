import {instance} from '../axios-instanse'

export const postBooks = () => {
    const list = [
        {
            id: 1 ,
            name: 'On Becoming a Leader',
            auther: 'Warren Bennis',
            price: 7,
            type: 'leaderShip'
        }, {
            id:  2,  
            name: 'The Art of War',
            auther: 'Sun Tzu',
            price: 17,
            type: 'leaderShip'
        }, {
            id:  3,  
            name: 'Good to Great',
            auther: 'Jim Collins',
            price: 27,
            type: 'leaderShip'
        }, {
            id: 4 ,  
            name: 'Start with Why',
            auther: 'Simon Sinek',
            price: 20,
            type: 'leaderShip'
        }, {
            id: 5 ,  
            name: 'First, Break All the Rules',
            auther: 'Marcus Buckingham',
            price: 21,
            type: 'leaderShip'
        }, {
            id: 6 ,  
            name: 'Emotional Intelligence',
            auther: 'Daniel Goleman',
            price: 30,
            type: 'leaderShip'
        }, {
            id:  7 ,  
            name: 'The Innovator’s Dilemma',
            auther: 'Clayton Christensen',
            price: 14,
            type: 'leaderShip'
        }, {
            id: 8 ,  
            name: 'Drive',
            auther: 'Daniel H. Pink',
            price: 12,
            type: 'leaderShip'
        }, {
            id: 9 ,  
            name: 'The Lean Startup',
            auther: 'Eric Ries',
            price: 15,
            type: 'leaderShip'
        }, {
            id: 10 ,  
            name: 'The Effective Executive',
            auther: 'Peter Drucker',
            price: 30,
            type: 'leaderShip'
        },
        {
            id: 11 ,  
            name: 'Don Quixote',
            auther: 'Miguel de Cervantes',
            price: 12,
            type: 'Adventures'
        },
        {
            id: 12 ,  
            name: 'The Three Musketeers',
            auther: 'Alexandre Dumas',
            price: 14,
            type: 'Adventures'
        },
        {
            id:13 ,  
            name: 'Treasure Island',
            auther: 'Robert Louis Stevenson',
            price: 20,
            type: 'Adventures'
        },
        {
            id: 14 ,  
            name: 'The Jungle Book',
            auther: 'Rudyard Kipling',
            price: 35,
            type: 'Adventures'
        },
        {
            id: 15 ,  
            name: 'Journey to the Center of the Earth',
            auther: 'Jules Verne',
            price: 10,
            type: 'Adventures'
        },
        {
            id: 16,  
            name: 'The Count of Monte Cristo',
            auther: 'Alexandre Dumas',
            price: 22,
            type: 'Adventures'
        },
        {
            id: 17 ,  
            name: 'Ivanhoe',
            auther: 'Walter Scott',
            price: 30,
            type: 'Adventures'
        },
        {
            id: 18 ,  
            name: 'Tarzan of the Apes',
            auther: 'Edgar Rice Burroughs',
            price: 25,
            type: 'Adventures'
        },
        {
            id: 19 ,  
            name: 'Heart of Darkness',
            auther: 'Joseph Conrad',
            price: 15,
            type: 'Adventures'
        },
        {
            id: 20 ,  
            name: 'Hatchet',
            auther: 'Gary Paulsen',
            price: 7,
            type: 'Adventures'
        },
        {
            id: 21 ,  
            name: 'Man’s Search for Meaning',
            auther: 'Victor E. Fankl',
            price: 15,
            type: 'Motivation'
        },
        {
            id: 22 ,  
            name: 'The Alchemist',
            auther: 'Paulo Coelho',
            price: 35,
            type: 'Motivation'
        },
        {
            id: 23 ,  
            name: 'The Four Agreements',
            auther: 'Don Miguel Ruiz',
            price: 10,
            type: 'Motivation'
        },
        {
            id: 24 ,  
            name: 'Mind Hacking',
            auther: '',
            price: 7,
            type: 'Motivation'
        },
        {
            id: 25 ,  
            name: 'Choose Yourself',
            auther: 'James Altucher',
            price: 32,
            type: 'Motivation'
        },
        {
            id: 26 ,  
            name: 'Mind Hacking',
            auther: 'Jennifer Ferguson',
            price: 10,
            type: 'Motivation'
        },

        {
            id: 27 ,  
            name: 'Girl Stop Apologizing',
            auther: 'Rachel Hollis',
            price: 21,
            type: 'Motivation'
        },
        {
            id: 28 ,  
            name: 'Think and Grow Rich',
            auther: 'Napoleon Hill',
            price: 32,
            type: 'Motivation'
        },
        {
            id: 29 ,  
            name: 'The 5 Second Rule',
            auther: 'Mel Robbins',
            price: 15,
            type: 'Motivation'
        },
        {
            id: 30 ,  
            name: 'Tuesdays with Morrie',
            auther: 'Mitch Albom',
            price: 20,
            type: 'Motivation'
        },
        {
            id: 31 ,  
            name: 'Imperfect Courage',
            auther: 'Jessica Honegger',
            price: 14,
            type: 'Motivation'
        },
        {
            id: 32 ,  
            name: 'The Snowy Day',
            auther: 'Ezra Jack Keats',
            price: 20,
            type: 'kids'
        },
        {
            id: 33 ,  
            name: 'Hello Lighthouse',
            auther: 'Sophie Blackall',
            price: 10,
            type: 'kids'
        },
        {
            id: 34 ,  
            name: 'Freight Train',
            auther: 'Donald Crews',
            price: 17,
            type: 'kids'
        },

        {
            id: 35 ,  
            name: 'Stellaluna',
            auther: 'Janell Cannon',
            price: 25,
            type: 'kids'
        }, {
            id: 36 ,  
            name: 'Corduroy',
            auther: 'Don Freeman',
            price: 12,
            type: 'kids'
        },
        {
            id: 37 ,  
            name: 'Ratburger',
            auther: 'David Walliams',
            price: 13,
            type: 'kids'
        },
        {
            id:38 ,  
            name: 'New Kid',
            auther: 'Jerry Craft',
            price: 23,
            type: 'kids'
        },
        {
            id: 39 ,  
            name: 'The Wild Robot',
            auther: 'Peter Brown',
            price: 24,
            type: 'kids'
        },
        {
            id: 40 ,  
            name: 'Stargazing',
            auther: 'Jen Wang',
            price: 9,
            type: 'kids'
        },


    ]
    instance.post('booksList.json', list).then(
        response => {
            return response
        }
    )
}


export const getBooks = async () => {
  const res =  await  instance.get('booksList/-MRkZv1a4V7CeVNp2qN4.json')
  .then(
        response => {
            return response
        }
    ).catch(error => {
        console.log('error' , error)
    })
    return res;
}


 export  const  getBook = async (id) => {
 const res = await  instance.get(`booksList/-MRkZv1a4V7CeVNp2qN4/${id}.json`).then(
        response => {
            return response
        }
    ).catch(error => {
        console.log('error' , error)
    })
    return res;
}

export const getBooksTypes = async () => {
    const res =  await  instance.get('bookstypes.json')
    .then(
          response => {
              return response
          }
      ).catch(error => {
          console.log('error' , error)
      })
      return res;
  }


