const Bar = ({ animationDuration, progress }: any) => {
    return (
        <div
            className="bg-black dark:bg-[#4C8EFF] h-1 w-full left-0 top-0 fixed z-50"
            style={{
                marginLeft: `${(-1 + progress) * 100}%`,
                transition: `margin-left ${animationDuration}ms linear`,
            }}
        ></div>
    );
};

export default Bar;
