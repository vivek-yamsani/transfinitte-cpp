import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  const hashedPasswd = await bcrypt.hash( 'admin' , salt) 
  
  const user = await prisma.user.create(
    {
      data: {
        id: "admin" ,
        name: 'admin',
        phone: '0000000000',
        role: 'ADMIN',
        email: 'admin@nitt.edu',
        password: hashedPasswd ,

      },
    }
  )
  console.log(user) 
  const department = await prisma.department.createMany({
    data: [
  	{ id: 02  , name: 'CHEM'  },
	{ id: 03  , name: 'CIVIL'  },
	{ id: 06  , name: 'CSE'  },
	{ id: 07  , name: 'EEE'  },
	{ id: 08  , name: 'ECE'  },
	{ id: 10  , name: 'ICE'  },
	{ id: 11  , name: 'MECH'  },
	{ id: 12  , name: 'MME'  },
	{ id: 14  , name: 'PROD'  },
	{ id: 01  , name: 'ARCH'  },
    ],
    skipDuplicates: true,
 })

  console.log(department)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
