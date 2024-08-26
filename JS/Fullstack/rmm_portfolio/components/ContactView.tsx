import { useReCaptcha } from "next-recaptcha-v3";
import { Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react";


const useFetchContact = (data: {text: string, email : string}, fire: boolean) => {
  const [contactRes, setContactRes] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)
  const { executeRecaptcha } = useReCaptcha();

  useEffect(() => {
    if(!fire) return

    const fetchContact = async () => {
      setIsLoading(true)

      const recaptchaToken = await executeRecaptcha("contact_submit")
      console.log("SENDIUNG")

      const responose = await fetch("/api/contact", {method: "POST", body: JSON.stringify({ ...data, recaptchaToken }  )})
      const res = await responose.json()

      setContactRes({...res, status: responose.status})
      
      setIsLoading(false)
    }
    fetchContact()
  }, [fire])
  
  return { contactRes, loading: isLoading }
}

const ContactView = () => {

  const [data, setData] = useState({email: '', text: ''})
  const [isOpen, setIsOpen] = useState(false)
  const { contactRes, loading } = useFetchContact(data, isOpen)

  return (
    <section
    id="contact"
    className="p__container border-t border-brand-secondary my-4 flex gap-6 flex-col "
    >
      <h3
      className="text-3xl font-bold"
      >Contact Me</h3>
      <form  
        onSubmit={async (e) => {
            e.preventDefault()
            if(!data.email || !data.text) return alert("Please fill all the fields")
            setIsOpen(true)
            
          }}
        className="flex flex-col gap-6 items-stretch"
        >
          <input type="email"
          onChange={(e) => setData({...data, email: e.target.value})}
          placeholder="Email"
          className="input bg-surface border border-brand-secondary rounded-lg w-full text-white"
          />
          <textarea
          onChange={(e) => setData({...data, text: e.target.value})}
          className="textarea border bg-surface border-brand-secondary rounded-lg w-full text-white" 
          placeholder="Type your message here..."
            cols={30} rows={10}
          >

          </textarea>
          <input type="submit" value="Send"
          className="input text-xl text-white bg-brand border border-brand-secondary rounded-xl w-full sm:max-w-[240px] cursor-pointer self-end " 
          />
        </form>
        <NotificationModal isOpen={isOpen} setIsOpen={setIsOpen} isLoading={loading} res={contactRes} />
    </section>
  )
}

interface ModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  isLoading: boolean
  res: any
}

function NotificationModal({isOpen, setIsOpen, res, isLoading} : ModalProps) {

  function closeModal() {
    setIsOpen(false)
  }


  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {
          if(isLoading)return
          closeModal()
        }}
        
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto text-white">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-surface p-6 text-left align-middle shadow-xl transition-all border border-brand">
                  {
                    isLoading ? (
                      <>
                        <span className="loading loading-spinner text-brand"></span>
                        <span className="animate-pulse">Loading</span>
                      </>
                    ) : 
                    <>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6"
                      >
                        {res.status == 200 ? "Message sent" : "Error sending message."}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm">
                          {res.message || "Message Sent"}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-row justify-end">
                        <button
                          type="button"
                          className="btn inline-flex justify-center rounded-md border border-transparent bg-brand px-4 py-2 text-sm font-medium text-white  focus-visible:ring-2 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Got it, thanks!
                        </button>
                      </div>
                  </>
                  }
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ContactView