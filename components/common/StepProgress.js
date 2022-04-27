const StepProgress = ({ step }) => {
  const currentStep = step.split('/')[0]
  const totalStep = step.split('/')[1]

  return (
    <div className='w-full h-8 rounded-full bg-white'>
      <div
        className='bg-black rounded-full h-full'
        style={{
          width: `${(currentStep / totalStep) * 100}%`,
        }}
      />
    </div>
  )
}

export default StepProgress
