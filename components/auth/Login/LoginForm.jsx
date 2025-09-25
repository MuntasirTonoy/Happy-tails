"use clint";
export default function LoginForm() {
  return (
    <div>
      <form className="space-y-4">
        <div className="form-control">
          <label htmlFor="email" className="label">
            <span className="label-text">Email address</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full "
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="password" className="label">
            <span className="label-text ">Password</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full "
            required
          />
          <label className="label mt-2 justify-end">
            <a href="#" className="text-xs text-green-500 hover:underline ">
              Forgot your password?
            </a>
          </label>
        </div>

        <button
          type="submit"
          className="btn bg-green-500 rounded-md text-white w-full"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
