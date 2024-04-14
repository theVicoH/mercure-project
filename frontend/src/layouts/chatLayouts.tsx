
interface Props {
  sideBar : React.ReactNode
  chat: React.ReactNode
}

const ChatLayouts: React.FC<Props> = ({ sideBar, chat }) => {
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <div className="w-80 bg-gray-800 text-white">
          {sideBar}
        </div>
        <div className="flex-1 p-4">
          {chat}
        </div>
      </div>
    </>
  )
}

export default ChatLayouts